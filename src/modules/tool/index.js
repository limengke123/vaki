const child_process = require('child_process')
const ConfigStore = require('configstore')
const clear = require('clear')
const figlet = require('figlet')
const { Helper, Log } = require('../../util')
const { toolConstant } = require('../../constant')
const defaultConfig = require('./defaultConfig')
const { open } = require('./option/open')
const { movie } = require('./option/movie/index')

const config = new ConfigStore(toolConstant.TOOL_CONF, defaultConfig)

const tool = option => {

    if (option.open) {
        open(option)
    }

    if (option.movie) {
        movie(option)
    }

    if (option.edit) {
        // 直接vim修改配置文件
        child_process.spawn('vim', [config.path], {
            stdio: 'inherit'
        })
    }

    if (option.parent.rawArgs.length === 3) {
        // 没有输入的时候
        clear()
        Log.green(figlet.textSync(toolConstant.TOOL_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero',
        }))
        option.help()
    }
}

exports.toolInstall = program => {
    program
        .command(toolConstant.TOOL_COMMAND_NAME)
        .alias('o')
        .option('-o, --open <urls>', 'open the urls in browser', Helper.getArr)
        .option('-s, --search <any>', 'add search condition in baidu or some other site')
        .option('-m --movie', 'search movie on the internet')
        .option('-e, --edit', 'edit your config file')
        .description('some useful third part tools')
        .action(tool)
}
