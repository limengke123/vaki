const Araneida = require('araneida')
const ora = require('ora')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const terminalLink = require('terminal-link');
const { segementFault } = require('../spider.config')
const defaultConfig = require('../defaultConfig')
const { readConstant } = require('../../../constant')

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('segementFault数据正在拼命加载中...')
})

exports.segementFaultHandler = option => {
    const spider = new Araneida({
        links: segementFault,
        done: data => {
            spinner.stop();
            let { length } = config.get(readConstant.READ_CONF_SEGE)
            if (option.length) {
                length = option.length
            }
            if (!option.all) {
                data = data.slice(0, length)
            }
            const result = data.map((item, index) => {
                console.log(item.url);
                if (item.url) {
                    const link = ' ' + terminalLink('link', segementFault.baseUrl + item.url)
                    return (index + 1) + '.' + item.title + link
                }
                return (index + 1) + '.' + item.title
            })
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
