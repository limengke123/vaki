const ConfigStore = require('configstore')
const axios = require('axios')
const chalk = require('chalk')
const ora = require('ora')
const { stockConstant, dingdingConstant } = require('../../../constant')
const { getStockByCode } = require('../api')
const { Markdown } = require('../../../util/index')

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('自选股票数据正在拼命加载中...')
})

const md = new Markdown()

const stockConfig = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})
const dingdingConfig = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {webhooks: []})

const send = list => {
    const webhooks = dingdingConfig.get('webhooks')
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
            const rawData = []
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
                let color = '#666'
                if (diff > 0) {
                    prefix = '+'
                    color = '#f54545'
                } else if (diff < 0) {
                    color = '#27F526'
                }
                currentPrice = (currentPrice.toFixed(2)).padEnd(9)
                diff = (prefix + diff.toFixed(2)).padEnd(8)
                rate = (prefix + rate).padEnd(8)
                code = code.padEnd(10)
                const number = ((index + 1) + '.').padEnd(3)
                const result = number + currentPrice + diff + rate + code + name
                list.push(result)
                rawData.push({
                    name,
                    currentPrice,
                    diff,
                    rate,
                    code,
                    color,
                    number
                })
            })
            rawData.forEach(item => {
                const { number, name, currentPrice, diff, rate, code, color} = item
                md.addText(number, '#49634d')
                    .addText(currentPrice, '#3A4E52')
                    .addText(diff, color)
                    .addText(rate, color)
                    .addText(code, '#797a80')
                    .addBoldText(name)
                    .addRawText('\n')
            })
            send(md.getText())
        }).catch(err => {
            console.log(chalk.red(err.message))
    })
}
