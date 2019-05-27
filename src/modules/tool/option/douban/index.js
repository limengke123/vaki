const { URL } = require('url')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const Araneida = require('araneida')
const { Tool, error } = require('../../../../util/index')
const { douban, doubanMovieDetail } = require('../../spider.config')

const { spinnerFactory } = Tool

exports.douban = option => {
    inquirer.prompt({
        type: 'input',
        name: 'word',
        message: 'input search word'
    }).then(answer => {
        return new Promise((resolve, reject) => {
            const { word } = answer
            const encodeUrl = Tool.getUriEncodeGBk(word, 'utf8')
            const url = douban.url + encodeUrl
            const spinner = spinnerFactory('豆瓣数据正在拼命加载中...')
            spinner.start()
            const spider = new Araneida({
                links: {...douban, url},
                done: data => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then(data => {
        const result = data.filter(item => item.tag)
        return inquirer.prompt({
            type: 'list',
            name: 'item',
            message: 'select a item',
            choices: result.map(item => {
                let {
                    tag,
                    rateNumber = '',
                    rateMan = '',
                    subjectCast = '',
                    title,
                } = item
                rateNumber = chalk.red(rateNumber + ' ')
                rateMan = chalk.grey(rateMan + ' ')
                const maxLength = 74
                if (tag.length + title.length + subjectCast.length + rateMan.length + rateNumber.length > maxLength) {
                    const leftLength = ~~((maxLength - tag.length - rateMan.length - rateNumber.length ) / 2)
                    title = Tool.ellipsisWord(title, leftLength)
                    subjectCast = Tool.ellipsisWord(subjectCast.replace(/\s/g, ''), leftLength) + ' '
                } else {
                    subjectCast = subjectCast.replace(/\s/g, '') + ' '
                }
                tag = tag + ' '
                const name = tag + title + chalk.keyword('orange')(subjectCast) + rateMan + rateNumber
                return {
                    name: name,
                    value: item
                }
            })
        })
    }).then(answer => {
        return new Promise((resolve, reject) => {
            const { item } = answer
            const { tag, link } = item
            const option = {}
            if (tag === '[电影]') {
            }
            const spinner = spinnerFactory('正在拼命加载豆瓣详情页面...')
            spinner.start()
            const spider = new Araneida({
                links: {
                    ...doubanMovieDetail,
                    url: link,
                },
                done: data => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then(data => {
        console.log(data)
    }).catch(err => {
        error(err.message)
    })
}
