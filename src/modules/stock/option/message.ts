import * as ConfigStore from 'configstore'
import axios from 'axios'
import chalk from 'chalk'
import * as ora from 'ora'
import { stockConstant, dingdingConstant } from '../../../constant'
import { getStockByCode } from '../api'
import { Markdown } from '../../../util'

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})


export interface Istock {
    name: string,
    todayOpenPrice: number,
    yesterdayClosingPrice: number,
    currentPrice: number,
    highestPrice: number,
    lowestPrice: number,
    code: string
}

export interface IMessageStock {
    name: string,
    currentPriceStr: string,
    diffStr: string,
    rate: string,
    code: string,
    number: string,
    color: string
}

const md = new Markdown()

const stockConfig = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})
const dingdingConfig = new ConfigStore(dingdingConstant.DINGDING_CONF, {webhooks: []})

const send = (list: string) => {
    const webhooks: Array<string> = dingdingConfig.get('webhooks')
    if (!webhooks.length) {
        return console.log('you haven\'t add any webhook yet')
    }

    // const result = list.join('  \n')
    webhooks.forEach(url => {
        axios.post(url, {
            msgtype: 'markdown',
            markdown: {
                title: '哦嚯，完蛋',
                text: list
            }
        })
    })
}

export const message = () => {
    const mine = stockConfig.get('mine')
    if (!mine.length) {
        return console.log('you haven\'t add any stock code yet')
    }
    const codes = mine.join(',')
    spinner.start()
    getStockByCode(codes)
        .then((res: Array<Istock> | Istock ) => {
            spinner.stop()
            if (!Array.isArray(res)) {
                res = [res]
            }

            const list = []
            const rawData: any[] = []
            res.forEach((stock, index: number) => {
                let {
                    name,
                    todayOpenPrice,
                    yesterdayClosingPrice,
                    currentPrice,
                    highestPrice,
                    lowestPrice,
                    code
                } = stock
                // 和昨日收盘价去比较
                let diff = currentPrice - yesterdayClosingPrice
                let rate = ((diff / yesterdayClosingPrice) * 100).toFixed(2)
                rate = rate + '%'
                let prefix = ''
                let color = '#666'
                if (diff > 0) {
                    prefix = '+'
                    color = '#f54545'
                } else if (diff < 0) {
                    color = '#0f990f'
                }
                const currentPriceStr: string = (currentPrice.toFixed(2)).padEnd(9)
                const diffStr: string = (prefix + diff.toFixed(2)).padEnd(8)
                rate = (prefix + rate).padEnd(8)
                code = code.padEnd(10)
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPriceStr + diffStr + rate + code + name
                list.push(result)
                let rawDataItem: IMessageStock = {
                    name,
                    currentPriceStr,
                    diffStr,
                    rate,
                    code,
                    color,
                    number
                }
                rawData.push(rawDataItem)
            })
            rawData.forEach((item: IMessageStock) => {
                const { number, name, currentPriceStr, diffStr, rate, code, color} = item
                md.addText(number, '#49634d')
                    .addText(currentPriceStr, '#3A4E52')
                    .addText(diffStr, color)
                    .addText(rate, color)
                    .addText(code, '#797a80')
                    .addBoldText(name)
                    .addRawText('\n')
            })
            send(md.getText())
        }).catch((err: Error)=> {
            console.log(chalk.red(err.message))
        })
}
