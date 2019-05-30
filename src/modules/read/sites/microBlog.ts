import { URL } from 'url'
import * as Araneida from 'araneida'
import * as ora from 'ora'
import * as ConfigStore from 'configstore'
import chalk from 'chalk'
import * as terminalLink from 'terminal-link'
import { microBlog } from '../spider.config'
import defaultConfig from '../defaultConfig'
import { readConstant } from '../../../constant'

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('微博数据正在拼命加载中...')
})

export const microBlogFaultHandler = (option: any) => {
    // console.log(config.get(readConstant.READ_CONF_BLOG))
    const spider = new Araneida({
        links: microBlog,
        done: (data: Array<{rank: string, label: string, hot: string, url: string, title: string}>)=> {
            spinner.stop()
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
            const url = new URL(microBlog.url)
            const baseUrl = url.origin
            const result = data.map((item, index) => {
                const link = terminalLink('link', baseUrl + item.url)
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
