const inquire = require('inquirer')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const { dingdingConstant } = require('../../../constant')

const config = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {mine: []})

exports.add = () => {
    inquire.prompt({
        type: 'input',
        message: 'input your dingding-webhook',
        name: 'webhook'
    }).then(res => {
        return Promise.all([
            Promise.resolve(res),
            inquire.prompt({
                type: 'confirm',
                message: `are you sure add ${res.webhook}`,
                name: 'check'
            })
        ])
    }).then(([info, answer]) => {
        if (answer.check) {
            const { webhook }= info
            const mine = config.get('mine')
            if (mine.indexOf(webhook) > -1) {
                console.log(chalk.red(`已经添加过${webhook}了, 无须重复添加`))
            } else {
                mine.push(webhook)
                config.set('mine', mine)
                console.log(chalk.blue(`成功添加了${webhook}到列表了`))
            }
        }
    }).catch(err => {
        console.log('error', err)
    })
}
