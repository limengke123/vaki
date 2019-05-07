const Araneida = require('araneida')
const ora = require('ora')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const terminalLink = require('terminal-link');
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
            data = data.filter(item => {
                // 过滤内容广告和置顶广告
                return item.rank && item.label !== '荐'
            })
            if (!option.all) {
                data = data.slice(0, length)
            }
            const result = data.map((item, index) => {
                const link = terminalLink('link', microBlog.baseUrl + item.url)
                const number = index + 1
                const hot = item.hot
                let label = item.label || ''
                if (label) {
                    label = chalk.white.bgRed(label)
                }
                let space = '. '
                if (number < 10) {
                    space += ' '
                }
                return number + space + item.title + ' ' + chalk.grey(hot) + ' ' + label + ' ---> ' + link
            })
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
