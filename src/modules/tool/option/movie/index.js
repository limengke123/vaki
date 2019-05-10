const { Url } = require('url')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const Araneida = require('araneida')
const { Tool, error } = require('../../../../util')
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
            name: 'movieName',
            message: 'select a movie list below:',
            choices: data.map(item => ({
                name: item.title,
                value: item
            }))
        })
    }).then(answer => {
        const { movieName } = answer
        const { url } = movieName
        console.log(dytt.url)
        const link = new Url(dytt.url)
    }).catch(err => {
        error(err.message)
    })
}
