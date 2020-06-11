import * as ConfigStore from 'configstore'
import chalk from 'chalk'
import clear = require('clear')
import * as ora from 'ora'
import { stockConstant } from '../../../constant'
import { getStockByCode } from '../api'
import { Istock } from './message'

const defaultIntervalTime = 5000

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})

const getColor = (rate: number | string): typeof chalk => {
    if (typeof rate === 'string') {
        rate = parseFloat(rate)
    }
    if (rate > 0) {
        // 涨了
        if (rate > 5) {
            // 涨疯了
            return chalk.rgb(225, 0, 0)
        }
        if (rate > 4) {
            return chalk.rgb(225, 20, 20)
        }
        if (rate > 3) {
            // 涨的还ok
            return chalk.rgb(225, 47, 47)
        }
        if (rate > 2) {
            return chalk.rgb(225, 76, 76)
        }
        if (rate > 1) {
            return chalk.rgb(225, 106, 106)
        }
        // 涨一丢丢啦
        return chalk.rgb(225, 140, 140)
    } else if (rate < 0) {
        if (rate < -5) {
            return chalk.rgb(0, 225, 0)
        }
        if (rate < -4) {
            return chalk.rgb(20, 225, 20)
        }
        if (rate < -3) {
            // 涨的还ok
            return chalk.rgb(47, 225, 47)
        }
        if (rate < -2) {
            return chalk.rgb(76, 225, 76)
        }
        if (rate < -1) {
            return chalk.rgb(106, 225, 106)
        }
        // 涨一丢丢啦
        return chalk.rgb(140, 225, 140)
    } else {
        return chalk.gray
    }
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

const _show  = (icon: boolean = true): Promise<void> => {
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
                let prefix = ''
                // if (diff < 0) {
                // } else if (diff > 0) {
                //     prefix = '+'
                // }
                if (diff > 0) {
                    prefix = '+'
                }
                let currentPriceStr: string = ''
                if (currentPrice >= 10) {
                    // 大于10块的显示两位小数，小于10块的显示三位小数
                    currentPriceStr = (currentPrice.toFixed(2)).padEnd(9)
                } else {
                    currentPriceStr = (currentPrice.toFixed(3)).padEnd(9)
                }
                const diffStr = getColor(rate)((prefix + diff.toFixed(2)).padEnd(8))
                rateStr = getColor(rate)((prefix + rateStr).padEnd(8))
                code = chalk.grey(code.padEnd(10))
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPriceStr + diffStr + rateStr + code + name
                // 输出内容
                console.log(result)
                // process.stdout.write(result)
            })
        }).catch((err: Error )=> {
            console.log(chalk.red(err.message))
        })
}
