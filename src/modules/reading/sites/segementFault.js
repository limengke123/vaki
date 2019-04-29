const Araneida = require('araneida')
const ora = require('ora')
const ConfigStore = require('configstore')
const { segementFault } = require('../spider.config')
const defaultConfig = require('../defaultConfig')
const { readConstant } = require('../../../constant')

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const spinner = ora({
    spinner: 'dots',
    text: '拼命加载中...'
})

exports.segementFaultHandler = () => {
    const spider = new Araneida({
        links: segementFault,
        done: data => {
            spinner.stop();
            const { length } = config.get(readConstant.READ_CONF_SEGE)
            data = data.slice(0, length)
            const result = data.map((item, index) => (index + 1) + '.' + item.title)
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
