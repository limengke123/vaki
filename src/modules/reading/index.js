const child_process = require('child_process')
const clear = require('clear')
const figlet = require('figlet')
const ConfigStore = require('configstore')
const { Log } = require('../../util')
const { readConstant } = require('../../constant')
const defaultConfig = require('./defaultConfig')
const { segementFaultHandler } = require('./sites/segementFault')

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const reading = option => {

    if (option.segementFault) {
        segementFaultHandler()
    }

    if (option.edit) {
        child_process.spawn('vim', [config.path], {
            stdio: 'inherit'
        })
    }

    if (option.parent.rawArgs.length === 3) {
        // 没有输入的时候
        clear()
        Log.green(figlet.textSync(readConstant.READ_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero',
        }))
        option.help()
    }
}

exports.readingInstall = program => {
    program
        .command(readConstant.READ_COMMAND_NAME)
        .alias('r')
        .option('-s, --segementFault', 'get interesting things from segementFault.com')
        .option('-e, --edit', 'edit your config file of read module')
        .description('reading some thing interesting')
        .action(reading)
}
