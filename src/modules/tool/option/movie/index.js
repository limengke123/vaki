const { URL } = require('url')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const Araneida = require('araneida')
const { Tool, error, success } = require('../../../../util')
const { dytt } = require('./spider.config')

const spinnerFactory = (text = '电影天堂数据正在拼命加载中...') => ora({
    spinner: 'dots',
    text: chalk.yellow(text)
})

exports.movie = option => {
    inquirer.prompt({
        type: 'input',
        name: 'names',
        message: 'input movie name:'
    }).then(answer => {
        return new Promise((resolve, reject) => {
            const { names } = answer
            const encodeUrl = Tool.getUriEncodeGBk(names)
            if (encodeUrl.length <= 6) {
                return reject(new Error(
                    '输入的关键词字节长度必须大于2，否则电影天堂不能搜索,' +
                    '一个中文2个字节，一个英文1个字节'
                ))
            }
            const url = dytt.url + encodeUrl
            const spinner = spinnerFactory()
            spinner.start()
            const spider = new Araneida({
                links: {...dytt, url},
                done: data => {
                    spinner.stop()
                    resolve(data)
                },
                encode: 'gbk'
            })
            spider.start()
        })
    }).then(data => {
        if (!data.length) {
            throw new Error('没有搜索到相关电影，换一个关键词试试？')
        }
        return inquirer.prompt({
            type: 'list',
            name: 'movie',
            message: 'select a movie list below:',
            choices: data.map(item => ({
                name: item.title,
                value: item
            }))
        })
    }).then(answer => {
        const { movie } = answer
        const { url } = movie
        const link = (new URL(dytt.url)).origin + url
        const spinner = spinnerFactory('下载链接正在拼命加载中...')
        return new Promise((resolve, reject) => {
            spinner.start()
            const spider = new Araneida({
                links: {
                    url: link,
                    rules: {
                        rule: {
                            ftpLink: {
                                type: 'text',
                                path: '#Zoom > span > table > tbody > tr > td > a'
                            }
                        }
                    }
                },
                done: data => {
                    spinner.stop()
                    resolve(data)
                },
                encode: 'gbk'
            })
            spider.start()
        })
    }).then(data => {
        success('以下为下载链接:')
        if (Array.isArray(data.ftpLink)) {
            data.ftpLink.forEach((link, index, array) => {
                const number = (index + 1) + '. '
                const suffix = index === array.length ? '' : '\n';
                const result = number + link + suffix
                console.log(result)
            })
        } else {
            console.log(data.ftpLink)
        }
    }).catch(err => {
        error(err.message)
    })
}
