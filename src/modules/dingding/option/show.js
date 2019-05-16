const ConfigStore = require('configstore')
const { dingdingConstant } = require('../../../constant')

const config = new ConfigStore(dingdingConstant.DINGDINNG_CONF, {mine: []})

exports.show = option => {
    const mine = config.get('mine')
    if (!mine.length) {
        return console.log('you haven\'t add any webhook yet')
    }

    mine.forEach(element => {
        console.log(element)
    })
}
