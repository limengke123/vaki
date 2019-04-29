const clear = require('clear')
const figlet = require('figlet')
const { readingConstant } = require('../../constant')
const { segementFaultHandler } = require('./sites/segementFault')


const reading = option => {

    if (option.segementFault) {
        segementFaultHandler()
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
        .option('-s, --segementFault', 'get interesting things from segementFault.com')
        .description('reading some thing interesting')
        .action(reading)
}
