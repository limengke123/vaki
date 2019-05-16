const ConfigStore = require('configstore')
const axios = require('axios')
const chalk = require('chalk')
const ora = require('ora')
const { stockConstant, dingdingConstant } = require('../../../constant')
const { getStockByCode } = require('../api')

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})

const stockConfig = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})
const dingdingConfig = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {webhooks: []})

const send = list => {
    const webhooks = dingdingConfig.get('webhooks')
    if (!webhooks.length) {
        return console.log('you haven\'t add any webhook yet')
    }

    const result = list.join('  \n')
    webhooks.forEach(url => {
        axios.post(url, {
            msgtype: 'text',
            text: {
                content: result
            }
        })
    })
}

exports.message = option => {
    const mine = stockConfig.get('mine')
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

            const list = []
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
                let rate = ((diff / yesterdayClosingPrice) * 100).toFixed(2)
                rate = rate + '%'
                let prefix = ''
                if (diff > 0) {
                    prefix = '+'
                }
                currentPrice = (currentPrice.toFixed(2)).padEnd(9)
                diff = (prefix + diff.toFixed(2)).padEnd(8)
                rate = (prefix + rate).padEnd(8)
                code = code.padEnd(10)
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPrice + diff + rate + code + name
                list.push(result)
            })
            send(list)
        }).catch(err => {
            console.log(chalk.red(err.message))
    })
}
