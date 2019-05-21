const inquire = require('inquirer')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const { dingdingConstant } = require('../../../constant')
const { success } = require('../../../util/index')

const config  = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {webhooks: []})

exports.remove = option => {
    const webhooks = config.get('webhooks')
    inquire.prompt({
        type: 'list',
        message: 'chose a webhooks that you want to remove',
        name: 'item',
        choices: webhooks
    }).then(({item}) => {
        return Promise.all([
            Promise.resolve(item),
            inquire.prompt({
                type: 'confirm',
                message: `are you sure remove ${item}`,
                name: 'check'
            })
        ])
    }).then(([item, answer]) => {
        if (answer.check) {
            const index = webhooks.findIndex(hooks => hooks === item)
            webhooks.splice(index, 1)
            config.set('webhooks', webhooks)
            success(`成功将${item}移除`)
        }
    })
}
