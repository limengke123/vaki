const chalk = require('chalk');
const padStart = String.prototype.padStart;
const log = console.log;

const format = (label, msg) => {
    return msg.split('\n').map((line, i) => {
        return i === 0
            ? `${label} ${line}`
            : padStart(line, chalk.reset(label).length)
    }).join('\n')
};

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `);

const Log = {
    error(message, tag) {
        log(format(chalk.bgGreen.black(' ERROR ') +
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
};

const Helper = {
    getArr(str, splitor = ',') {
        return str.split(splitor);
    }
};

const Time = {
    get today () {
        const date = new Date();
        const dateArr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ];
        return dateArr.join('-');
    }
};

module.exports = {
    error: Log.error,
    Log,
    Helper,
    Time
};
