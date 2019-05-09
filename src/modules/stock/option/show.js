const ConfigStore = require('configstore')
const chalk = require('chalk')
const ora = require('ora')
const { stockConstant } = require('../../../constant')
const { getStockByCode } = require('../api')

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})

const config = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})

exports.show = option => {
    const mine = config.get('mine')
    if (!mine.length) {
        return console.log('you haven\'t add any stock code yet')
    }
    const codes = mine.join(',')
    spinner.start()
    getStockByCode(codes)
        .then(res => {
            spinner.stop()
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
                let diff = currentPrice - yesterdayClosingPrice
                let rate = ((diff / yesterdayClosingPrice) * 100).toFixed(2) + '%'
                let color = 'grey'
                let prefix = ''
                if (diff < 0) {
                    color = 'green'
                } else if (diff > 0) {
                    color = 'red'
                    prefix = '+'
                }
                currentPrice = (currentPrice.toFixed(2)).padEnd(9)
                diff = chalk[color]((prefix + diff.toFixed(2)).padEnd(8))
                rate = chalk[color]((prefix + rate).padEnd(8))
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPrice + diff + rate + name.padEnd(5)
                console.log(result)
            })
        }).catch(err => {
            console.log(chalk.red(err.message))
    })
}
