import * as ora from 'ora'
import { URL } from 'url'
import * as inquirer from 'inquirer'
import chalk from 'chalk'
import * as Araneida from 'araneida'
import { Tool, error } from '../../../../util'
import { douban, doubanMovieDetail } from '../../spider.config'

const { spinnerFactory } = Tool

interface Idouban {
    tag: string,
    rateNumber: string,
    rateMan: string,
    subjectCast: string,
    title: string
}

export const doubanHandle = (option: any) => {
    inquirer.prompt({
        type: 'input',
        name: 'word',
        message: 'input search word'
    }).then((answer: {word: string}) => {
        return new Promise((resolve, reject) => {
            const { word } = answer
            const encodeUrl: string = Tool.getUriEncodeGBk(word, 'utf8')
            const url: string = douban.url + encodeUrl
            const spinner: ora.Ora = spinnerFactory('豆瓣数据正在拼命加载中...')
            spinner.start()
            const spider = new Araneida({
                links: {...douban, url},
                done: (data: any) => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then((data: Array<Idouban>)=> {
        const result = data.filter(item => item.tag)
        return inquirer.prompt({
            type: 'list',
            name: 'item',
            message: 'select a item',
            choices: result.map(item => {
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
    }).then((answer: any) => {
        return new Promise((resolve, reject) => {
            const { item } = answer
            const { tag, link } = item
            const option = {}
            if (tag === '[电影]') {
            }
            const spinner: ora.Ora = spinnerFactory('正在拼命加载豆瓣详情页面...')
            spinner.start()
            const spider = new Araneida({
                links: {
                    ...doubanMovieDetail,
                    url: link,
                },
                done: (data: any) => {
                    spinner.stop()
                    resolve(data)
                }
            })
            spider.start()
        })
    }).then((data: any) => {
        console.log(data)
    }).catch((err: Error)=> {
        error(err.message)
    })
}
