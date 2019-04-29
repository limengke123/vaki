const child_process = require('child_process')
const opener = require('opener')
const ConfigStore = require('configstore')
const clear = require('clear')
const figlet = require('figlet')
const { Helper, Tool, Log } = require('../../util')
const { readingConstant } = require('../../constant')


const reading = option => {

    if (option.zhihu) {
        console.log(option.zhihu)
    }

    if (option.parent.rawArgs.length === 3) {
        // 没有输入的时候
        clear()
        Log.green(figlet.textSync(readingConstant.READING_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero',
        }))
        option.help()
    }
}

exports.readingInstall = program => {
    program
        .command(readingConstant.READING_COMMAND_NAME)
        .alias('r')
        .option('-z, --zhihu', 'get interesting things from zhihu.com')
        .description('reading some thing interesting')
        .action(reading)
}
