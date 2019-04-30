const Araneida = require('araneida')
const ora = require('ora')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const { microBlog } = require('../spider.config')
const defaultConfig = require('../defaultConfig')
const { readConstant } = require('../../../constant')

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('微博数据正在拼命加载中...')
})

exports.microBlogFaultHandler = option => {
    // console.log(config.get(readConstant.READ_CONF_BLOG))
    const spider = new Araneida({
        links: microBlog,
        done: data => {
            spinner.stop();
            let { length } = config.get(readConstant.READ_CONF_BLOG)
            if (option.length) {
                length = option.length
            }
            if (!option.all) {
                data = data.slice(0, length)
            }
            const result = data.map((item, index) => (index + 1) + '.' + item.title)
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
