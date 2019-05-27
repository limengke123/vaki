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

module.exports = {
    get
}
