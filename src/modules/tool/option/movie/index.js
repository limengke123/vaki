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
            if (names.length < 2) {
                return reject('输入的关键词必须大于1，否则电影天堂不能搜索')
            }
            const encodeUrl = Tool.getUriEncodeGBk(names)
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
        console.log(answer)
    }).catch(err => {
        error(err)
    })
}
