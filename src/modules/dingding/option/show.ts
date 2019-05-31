import * as ConfigStore from 'configstore'
import { dingdingConstant } from '../../../constant'

const config = new ConfigStore(dingdingConstant.DINGDING_CONF, {webhooks: []})

export const show = () => {
    const webhooks: Array<string> = config.get('webhooks')
    if (!webhooks.length) {
        return console.log('you haven\'t add any webhook yet')
    }

    webhooks.forEach(element => {
        console.log(element)
    })
}
