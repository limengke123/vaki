import * as ConfigStore from 'configstore'
import chalk from 'chalk'
import * as clear from 'clear'
import * as ora from 'ora'
import { stockConstant } from '../../../constant'
import { getStockByCode } from '../api'
import { Istock } from './message'
import { color } from '../../../util/common'

const defaultIntervalTime = 5000

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})

const getColor = (rate: number) => {
    let color = 'grey'
    if (rate > 0) {
        // 涨了
        if (rate > 5) {
        }
    } else if (rate < 0) {
        // 跌了
    }
    return color
}

const config = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const show = async (time: number | boolean, showIcon: boolean = true) => {
    const mine = config.get('mine')
    if (!mine.length) {
        return console.log('you haven\'t add any stock code yet')
    }
    if (time) {
        const intervalTime = typeof time === 'number' ? time : defaultIntervalTime
        clear()
        await _show(showIcon)
        while (true) {
            await sleep(intervalTime)
            clear()
            await _show(false)
        }
    } else {
        _show(showIcon)
            .catch(err => console.log(chalk.red(err.message)))
    }
}

const _show  = (icon: boolean = true): Promise<any> => {
    const mine = config.get('mine')
    const codes = mine.join(',')
    if (icon) {
        spinner.start()
    }
    return getStockByCode(codes)
        .then((res: Array<Istock> | Istock)=> {
            if (icon) {
                spinner.stop()
            }
            if (!Array.isArray(res)) {
                res = [res]
            }
            res.forEach((stock, index) => {
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
                let diff: number = currentPrice - yesterdayClosingPrice
                let rate: string = ((diff / yesterdayClosingPrice) * 100).toFixed(2)
                let rateStr: string = rate + '%'
                let color: color = 'grey'
                let prefix = ''
                if (diff < 0) {
                    color = 'green'
                } else if (diff > 0) {
                    color = 'red'
                    prefix = '+'
                }
                const currentPriceStr: string = (currentPrice.toFixed(2)).padEnd(9)
                const diffStr = chalk[color]((prefix + diff.toFixed(2)).padEnd(8))
                rateStr = chalk[color]((prefix + rateStr).padEnd(8))
                code = chalk.grey(code.padEnd(10))
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPriceStr + diffStr + rateStr + code + name
                console.log(result)
            })
        }).catch((err: Error )=> {
            console.log(chalk.red(err.message))
        })
}
