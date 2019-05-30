import { URL } from 'url'
import * as Araneida from 'araneida'
import * as ora from 'ora'
import * as ConfigStore from 'configstore'
import chalk from 'chalk'
import terminalLink from 'terminal-link'
import { segementFault } from '../spider.config'
import defaultConfig from '../defaultConfig'
import { readConstant } from '../../../constant'

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const spinner = ora({
    spinner: 'dots',
    text: chalk.yellow('segementFault数据正在拼命加载中...')
})

export const segementFaultHandler = (option: any) => {
    const spider = new Araneida({
        links: segementFault,
        done: (data: Array<{url: string, stars: string, info: string, title: string}>) => {
            spinner.stop()
            let { length } = config.get(readConstant.READ_CONF_SEGE)
            if (option.length) {
                length = option.length
            }
            if (!option.all) {
                data = data.slice(0, length)
            }
            const result = data.map((item, index) => {
                const number = index + 1
                let space = '. '
                if (number < 10) {
                    space += ' '
                }
                let link = ''
                let stars = ''
                const url = new URL(segementFault.url)
                const baseUrl = url.origin
                if (item.url) {
                    link = ' ----> ' + terminalLink('link', baseUrl + item.url)
                }
                if (item.stars) {
                    stars = ' ' + chalk.grey(item.stars)
                }
                const info = ' ' + chalk.green(item.info)
                return number + space + item.title + stars + info + link
            })
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
