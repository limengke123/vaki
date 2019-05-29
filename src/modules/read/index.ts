import commander = require('commander')
const child_process = require('child_process')
const clear = require('clear')
const figlet = require('figlet')
const ConfigStore = require('configstore')
const { Log } = require('../../util/index')
const { readConstant } = require('../../constant')
const defaultConfig = require('./defaultConfig')
const { segementFaultHandler } = require('./sites/segementFault')
const { microBlogFaultHandler } = require('./sites/microBlog')

const config = new ConfigStore(readConstant.READ_CONF, defaultConfig)

const reading = (option: any) => {

    if (option.segementFault) {
        segementFaultHandler(option)
    }

    if (option.weibo) {
        microBlogFaultHandler(option)
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

export const readingInstall = (program: commander.Command) => {
    program
        .command(readConstant.READ_COMMAND_NAME)
        .alias('r')
        .option('-s, --segementFault', 'get interesting things from segementFault.com')
        .option('-w, --weibo', 'get hottest news from weibo')
        .option('-e, --edit', 'edit your config file of read module')
        .option('-l, --length <length>', 'show the list length')
        .option('-a, --all', 'show all the data regardless the option of [length]')
        .description('reading some thing interesting')
        .action(reading)
}
