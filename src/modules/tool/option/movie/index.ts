import * as ora from 'ora'
import { URL } from 'url'
import * as inquirer from 'inquirer'
import * as Araneida from 'araneida'
import { Tool, error, success } from '../../../../util'
import { dytt } from '../../spider.config'

const { spinnerFactory } = Tool

interface Imovie {
    url: string,
    title: string
}

interface ILInk {
    ftpLink: string | Array<string>
}

export const movie = (option: any) => {
    inquirer.prompt({
        type: 'input',
        name: 'names',
        message: 'input movie name:'
    }).then((answer: any) => {
        return new Promise<Array<Imovie>>((resolve, reject) => {
            const { names } = answer
            const encodeUrl: string = Tool.getUriEncodeGBk(names)
            if (encodeUrl.length <= 6) {
                return reject(new Error(
                    '输入的关键词字节长度必须大于2，否则电影天堂不能搜索,' +
                    '一个中文2个字节，一个英文1个字节'
                ))
            }
            const url: string = dytt.url + encodeUrl
            const spinner: ora.Ora = spinnerFactory()
            spinner.start()
            const spider = new Araneida({
                links: {...dytt, url},
                done: (data: Array<Imovie>) => {
                    spinner.stop()
                    resolve(data)
                },
                encode: 'gbk'
            })
            spider.start()
        })
    }).then((data: Array<Imovie>) => {
        if (!data.length) {
            throw new Error('没有搜索到相关电影，换一个关键词试试？')
        }
        return inquirer.prompt({
            type: 'list',
            name: 'movie',
            message: 'select a movie list below:',
            choices: data.map((item: Imovie) => ({
                name: item.title,
                value: item
            }))
        })
    }).then((answer: any) => {
        const { movie } = answer
        const { url } = movie
        const link: string = (new URL(dytt.url)).origin + url
        const spinner: ora.Ora = spinnerFactory('下载链接正在拼命加载中...')
        return new Promise<ILInk[]>((resolve, reject) => {
            spinner.start()
            const spider = new Araneida({
                links: {
                    url: link,
                    rules: {
                        list: '#Zoom > span > table',
                        rule: {
                            ftpLink: {
                                type: 'text',
                                path: 'tbody > tr > td a'
                            }
                        }
                    }
                },
                done: (data: ILInk[]) => {
                    spinner.stop()
                    resolve(data)
                },
                encode: 'gbk'
            })
            spider.start()
        })
    }).then((data: ILInk[]) => {
        success('以下为下载链接:')
        if (data.length > 1) {
            data.forEach((link: ILInk, index: number, array: Array<ILInk>) => {
                const number = (index + 1) + '. '
                const suffix = index === array.length ? '' : '\n'
                const result = number + link.ftpLink + suffix
                console.log(result)
            })
        } else {
            console.log(data[0].ftpLink)
        }
    }).catch((err: Error) => {
        error(err.message)
    })
}
