import * as inquire from 'inquirer'
import * as ConfigStore from 'configstore'
import chalk from 'chalk'
import { dingdingConstant } from '../../../constant'

const config = new ConfigStore(dingdingConstant.DINGDING_CONF, {webhooks: []})

export const add = () => {
    inquire.prompt({
        type: 'input',
        message: 'input your dingding-webhook',
        name: 'webhook'
    }).then((res: any) => {
        return Promise.all([
            Promise.resolve(res),
            inquire.prompt({
                type: 'confirm',
                message: `are you sure add ${res.webhook}`,
                name: 'check'
            })

        ])
    }).then(([info, answer]: [any, any]) => {
        if (answer.check) {
            const { webhook }= info
            const webhooks = config.get('webhooks')
            if (webhooks.indexOf(webhook) > -1) {
                console.log(chalk.red(`已经添加过${webhook}了, 无须重复添加`))
            } else {
                webhooks.push(webhook)
                config.set('webhooks', webhooks)
                console.log(chalk.blue(`成功添加了${webhook}到列表了`))
            }
        }
    }).catch((err: Error) => {
        console.log('error', err)
    })
}