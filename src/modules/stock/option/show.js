const ConfigStore = require('configstore')
const chalk = require('chalk')
const { stockConstant } = require('../../../constant')
const { getStockByCode } = require('../api')

const config = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})

exports.show = option => {
    const mine = config.get('mine')
    if (!mine.length) {
        return console.log('you haven\'t add any stock code yet')
    }
    const codes = mine.join(',')
    getStockByCode(codes)
        .then(res => {
            res.forEach((stock, index) => {
                const {
                    name,
                    todayOpenPrice,
                    yesterdayClosingPrice,
                    currentPrice,
                    highestPrice,
                    lowestPrice,
                    code
                } = stock
                const number = (index + 1) + '. '
                const result = number + name + ' ' + currentPrice
                console.log(result)
            })
        }).catch(err => {
            console.log(chalk.red(err.message))
    })
}
