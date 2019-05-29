import * as commander from 'commander'
import * as child_process from 'child_process'
import * as ConfigStore from 'configstore'
import * as clear from 'clear'
import * as figlet from 'figlet'
import { Helper, Log } from '../../util'
import { toolConstant } from '../../constant'
import defaultConfig from './defaultConfig'
import { open } from './option/open'
import { movie } from './option/movie'
import { doubanHandle } from './option/douban'

const config = new ConfigStore(toolConstant.TOOL_CONF, defaultConfig)

const tool = (option: any) => {

    if (option.open) {
        open(option)
    }

    if (option.movie) {
        movie(option)
    }

    if (option.douban) {
        doubanHandle(option)
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

export const toolInstall = (program: commander.Command) => {
    program
        .command(toolConstant.TOOL_COMMAND_NAME)
        .alias('o')
        .option('-o, --open <urls>', 'open the urls in browser', Helper.getArr)
        .option('-s, --search <any>', 'add search condition in baidu or some other site')
        .option('-d --douban', 'search any word on the douban')
        .option('-m --movie', 'search movie on the internet')
        .option('-e, --edit', 'edit your config file')
        .description('some useful third part tools')
        .action(tool)
}
