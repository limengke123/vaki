const { get } = require('../../util')

export const getStockByCode = (code: string) => {
    if (!code) {
        return Promise.reject('没有传code过来')
    }
    const baseUrl: string = 'http://hq.sinajs.cn/list='
    const url: string = baseUrl + code
    return get(url, {
        encoding: 'gbk'
    }).then((res: string) => {
        const stockInfo: Array<string> = res.split('\n').filter(item => item)
        const result = stockInfo.map((stock, index) => {
            const body: string = stock.split('\"')[1]
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

