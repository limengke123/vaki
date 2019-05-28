const http = require('http')
import iconv = require('iconv-lite')

export interface getOption {
    encoding: string
}

const get:(url: string, option: getOption) => Promise<any> = (url: string, option: getOption = { encoding: 'utf8'}) => new Promise((resolve, reject) => {
    http.get(url, (res: { statusCode: number; resume?: any; pipe?: any; }) => {
        const { statusCode } = res
        let error
        if (statusCode !== 200) {
            error = new Error(`请求失败\n 状态码：${statusCode}`)
        }
        if (error) {
            reject(error)
            return res.resume()
        }

        const converterStream = iconv.decodeStream(option.encoding)
        res.pipe(converterStream)
        let rawData = ''
        converterStream.on('data', chunk => {
            rawData += chunk
        })
        converterStream.on('end', () => {
            resolve(rawData)
        })
    }).on('error', (e: { message: string; }) => reject(e.message))
})

module.exports = {
    get
}
