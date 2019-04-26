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

module.exports = {
    error: (message, tag) => log(format(chalk.bgGreen.black(' ERROR ') + (tag ? chalkTag(tag) : ''), message)),
};
