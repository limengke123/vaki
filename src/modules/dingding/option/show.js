const ConfigStore = require('configstore')
const { dingdingConstant } = require('../../../constant')

const config = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {webhooks: []})

exports.show = option => {
    const webhooks = config.get('webhooks')
    if (!webhooks.length) {
        return console.log('you haven\'t add any webhook yet')
    }

    webhooks.forEach(element => {
        console.log(element)
    })
}
