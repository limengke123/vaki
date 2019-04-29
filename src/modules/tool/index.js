const child_process = require('child_process')
const opener = require('opener')
const ConfigStore = require('configstore')
const clear = require('clear')
const figlet = require('figlet')
const { Helper, Tool, Log } = require('../../util')
const { toolConstant } = require('../../constant')
const defaultConfig = require('./defaultConfig')

const config = new ConfigStore(toolConstant.TOOL_CONF, defaultConfig)

const tool = option => {
    if (option.open) {
        option.open.forEach(str => {
            if (Tool.checkIsLinkLike(str)) {
                // 直接给的是个链接
                opener(Tool.transformToLink(str))
            } else {
                // 检测是否是在config配置过的页面
                const sites = config.get('sites')
                const siteArr = sites.filter(site => site.name === str || site.alias === str)
                if (siteArr.length) {
                    const targetSite = siteArr[0]
                    if (targetSite.search && option.search) {
                        opener(targetSite.search + option.search)
                    } else {
                        opener(targetSite.url)
                    }
                } else {
                    opener(str)
                }
            }
        })
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
        .option('-e, --edit', 'edit your config file')
        .description('some useful third part tools')
        .action(tool)
}
