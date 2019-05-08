const http = require('http')
const iconv = require('iconv-lite')

const get = (url, option = { encoding: 'utf8'}) => new Promise((resolve, reject) => {
    http.get(url, res => {
        const { statusCode } = res
        let error
        if (statusCode !== 200) {
            error = new Error(`请求失败\n 状态码：${statusCode}`)
        }
        if (error) {
            reject(error)
            return res.resume()
        }

        const converterStream = iconv.decodeStream(option.encoding);
        res.pipe(converterStream)
        let rawData = ''
        converterStream.on('data', chunk => {
            rawData += chunk
        })
        converterStream.on('end', () => {
            resolve(rawData)
        })
    }).on('error', e => reject(e.message))
})

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
        const result = stockInfo.map(stock => {
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
                code
            }
        })
        if (result.length === 1) {
            return result[0]
        }
        return result
    })
}

module.exports = {
    get,
    getStockByCode,
}
