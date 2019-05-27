const { get } = require('../../util')

const getStockByCode = code => {
    if (!code) {
        return Promise.reject('没有传code过来')
    }
    const baseUrl = 'http://hq.sinajs.cn/list='
    const url = baseUrl + code
    return get(url, {
        encoding: 'gbk'
    }).then(res => {
        const stockInfo = res.split('\n').filter(item => item)
        const result = stockInfo.map((stock, index) => {
            const body = stock.split('\"')[1]
            const [
                name,
                todayOpenPrice,
                yesterdayClosingPrice,
                currentPrice,
                highestPrice,
                lowestPrice
            ] = body.split(',')
            return {
                name,
                todayOpenPrice: +todayOpenPrice,
                yesterdayClosingPrice: +yesterdayClosingPrice,
                currentPrice: +currentPrice,
                highestPrice: +highestPrice,
                lowestPrice: +lowestPrice,
                code: code.split(',')[index]
            }
        })
        if (result.length === 1) {
            return result[0]
        }
        return result
    })
}

module.exports = {
    getStockByCode,
}
