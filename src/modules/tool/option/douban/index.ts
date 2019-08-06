import * as ora from 'ora'
import * as inquirer from 'inquirer'
import chalk from 'chalk'
import * as Araneida from 'araneida'
import { Tool, error } from '../../../../util'
import { douban, Idouban, doubanMovieDetail, ImovieItem } from '../../spider.config'

const { spinnerFactory } = Tool

interface Ianswer {
    name: string,
    item: Idouban
}

export const doubanHandle = () => {
    inquirer.prompt({
        type: 'input',
        name: 'word',
        message: 'input search word'
    }).then((answer: any) => {
        return new Promise<Array<Idouban>>(resolve => {
            const { word } = answer
            const encodeUrl: string = Tool.getUriEncodeGBk(word, 'utf8')
            const url: string = douban.url + encodeUrl
            const spinner: ora.Ora = spinnerFactory('豆瓣数据正在拼命加载中...')
            spinner.start()
            const spider = new Araneida({
                links: {...douban, url},
                done: (data: Array<Idouban>) => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then((data: Array<Idouban>)=> {
        const result = data.filter((item: Idouban) => item.tag)
        return inquirer.prompt<Ianswer>({
            type: 'list',
            name: 'item',
            message: 'select a item',
            choices: result.map((item: Idouban) => {
                let {
                    tag,
                    rateNumber = '',
                    rateMan = '',
                    subjectCast = '',
                    title,
                } = item
                rateNumber = chalk.red(rateNumber + ' ')
                rateMan = chalk.grey(rateMan + ' ')
                const maxLength: number = 74
                if (tag.length + title.length + subjectCast.length + rateMan.length + rateNumber.length > maxLength) {
                    const leftLength: number = ~~((maxLength - tag.length - rateMan.length - rateNumber.length ) / 2)
                    title = Tool.ellipsisWord(title, leftLength)
                    subjectCast = Tool.ellipsisWord(subjectCast.replace(/\s/g, ''), leftLength) + ' '
                } else {
                    subjectCast = subjectCast.replace(/\s/g, '') + ' '
                }
                tag = tag + ' '
                const name: string = tag + title + chalk.keyword('orange')(subjectCast) + rateMan + rateNumber
                return {
                    name: name,
                    value: item
                }
            })
        })
    }).then((answer: Ianswer) => {
        return new Promise<ImovieItem>((resolve) => {
            const { item } = answer
            const { tag, link } = item
            if (tag === '[电影]') {
            }
            const spinner: ora.Ora = spinnerFactory('正在拼命加载豆瓣详情页面...')
            spinner.start()
            const spider = new Araneida({
                links: {
                    ...doubanMovieDetail,
                    url: link,
                },
                done: (data: ImovieItem) => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then((data: ImovieItem) => {
        console.log(data)
    }).catch((err: Error)=> {
        error(err.message)
    })
}
