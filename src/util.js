const chalk = require('chalk')
const iconv = require('iconv-lite')
const padStart = String.prototype.padStart
const log = console.log

const format = (label, msg) => {
    if (!msg) {
        return ''
    }
    return msg.split('\n').map((line, i) => {
        return i === 0
            ? `${label} ${line}`
            : padStart.call(line, chalk.reset(label).length)
    }).join('\n')
}

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

const Log = {
    error(message, tag) {
        log(format(chalk.bgRed.black(' ERROR ') +
            (tag ? chalkTag(tag) : ''),
        message)
        )
    },
    green(message) {
        log(chalk.green(message))
    },
    blue(message) {
        log(chalk.blue(message))
    }
}

const Helper = {
    getArr(str, separator = ',') {
        return str.split(separator)
    }
}

const Common = {
    getLuckNumber () {
        return ~~(Math.random() * 10)
    },
    getTitle(str, color = 'green') {
        const baseLength = 30
        const lastSpace = baseLength - str.length
        const left = ~~(lastSpace / 2)
        const right = lastSpace - left
        const title = chalk[color].bold.underline(str)
        const leftString = Array.from({length: left}).fill('=').join('')
        const rightString = Array.from({length: right}).fill('=').join('')
        return leftString + ' ' + title + ' ' + rightString
    }
}

const Time = {
    get today () {
        const date = new Date()
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
    transformToLink (str) {
        // 让一个类链接变成一个链接
        const prefix = 'http://'
        if (Tool.checkIsLinkLike(str) && !~str.indexOf(prefix)) {
            return prefix + str
        }
        return str
    },
    checkIsLinkLike (str) {
        // 检测一个字符串是不是一个类链接
        // http://xxx 、xxx.com字样 、http://xxx.net
        const reg = /^(https?:\/\/)?\w+\.[a-z0-9_.]+/g
        return reg.test(str)
    },
    getUriEncodeGBk (str) {
        const buf = iconv.encode(str, 'gbk')
        return Array.prototype.map.call(buf, (char) => {
            const hex = char.toString(16)
            return '%' + hex
        }).join('')
    }
}

module.exports = {
    error: Log.error,
    Log,
    Helper,
    Time,
    Common,
    Tool
}
