const chalk = require('chalk')
const iconv = require('iconv-lite')
const ora = require('ora')
const padStart = String.prototype.padStart
const log = console.log

const format = (label: string, msg: string) => {
    if (!msg) {
        return ''
    }
    return msg.split('\n').map((line: string, i: number) => {
        return i === 0
            ? `${label} ${line}`
            : padStart.call(line, chalk.reset(label).length)
    }).join('\n')
}

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `)

const Log = {
    error(message: string, tag: string): void {
        log(format(chalk.bgRed.black(' ERROR ') +
            (tag ? chalkTag(tag) : ''), message))
    },
    success (message: string, tag: string): void {
        log(format(chalk.bgGreen.black(' SUCCESS ') +
            (tag ? chalkTag(tag) : ''), message))
    },
    green(message: string): void {
        log(chalk.green(message))
    },
    blue(message: string): void {
        log(chalk.blue(message))
    }
}

const Helper = {
    getArr(str: string, separator: string = ','): Array<string> {
        return str.split(separator)
    }
}

const Common = {
    getLuckNumber (): number {
        return ~~(Math.random() * 10)
    },
    getTitle(str: string, color: string = 'green'): string {
        const baseLength: number = 30
        const lastSpace: number = baseLength - str.length
        const left: number = ~~(lastSpace / 2)
        const right: number = lastSpace - left
        const title: string = chalk[color].bold.underline(str)
        const leftString: string = Array.from({length: left}).fill('=').join('')
        const rightString: string = Array.from({length: right}).fill('=').join('')
        return leftString + ' ' + title + ' ' + rightString
    }
}

const Time = {
    get today (): string {
        const date: Date = new Date()
        const dateArr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ]
        return dateArr.join('-')
    }
}

// Tool模块
const Tool = {
    transformToLink (str: string): string {
        // 让一个类链接变成一个链接
        const prefix: string = 'http://'
        if (Tool.checkIsLinkLike(str) && !~str.indexOf(prefix)) {
            return prefix + str
        }
        return str
    },
    checkIsLinkLike (str: string): boolean {
        // 检测一个字符串是不是一个类链接
        // http://xxx 、xxx.com字样 、http://xxx.net
        const reg: RegExp = /^(https?:\/\/)?\w+\.[a-z0-9_.]+/g
        return reg.test(str)
    },
    getUriEncodeGBk (str: string, encode: string = 'gbk'): string {
        const buf: Buffer = iconv.encode(str, encode)
        return Array.prototype.map.call(buf, (char: string): string => {
            // @ts-ignore
            const hex: string = char.toString(16)
            return '%' + hex
        }).join('')
    },
    spinnerFactory (text = '电影天堂数据正在拼命加载中...') {
        return ora({
            spinner: 'dots',
            text: chalk.yellow(text)
        })
    },
    ellipsisWord (text: string, length: number = 5, replacement: string = '...'): string {
        if (text.length >= length) {
            return text.slice(0, length) + replacement
        } else {
            return text
        }
    }
}

export = {
    error: Log.error,
    success: Log.success,
    Log,
    Helper,
    Time,
    Common,
    Tool
}
