import * as inquire from 'inquirer'
import * as ConfigStore from 'configstore'
import { dingdingConstant } from '../../../constant'
import { success } from '../../../util'

const config  = new ConfigStore(dingdingConstant.DINGDING_CONF, {webhooks: []})

export const remove = () => {
    const webhooks: Array<string> = config.get('webhooks')
    inquire.prompt({
        type: 'list',
        message: 'chose a webhooks that you want to remove',
        name: 'item',
        choices: webhooks
    }).then(({item}: any) => {
        return Promise.all([
            Promise.resolve(item),
            inquire.prompt({
                type: 'confirm',
                message: `are you sure remove ${item}`,
                name: 'check'
            })
        ])
    }).then(([item, answer]: [any, any]) => {
        if (answer.check) {
            const index = webhooks.findIndex(hooks => hooks === item)
            webhooks.splice(index, 1)
            config.set('webhooks', webhooks)
            success(`成功将${item}移除`)
        }
    })
}
