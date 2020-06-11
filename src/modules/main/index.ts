import * as commander from 'commander'
import * as child_process from 'child_process'
import clear = require('clear')
import * as figlet from 'figlet'
import * as ConfigStore from 'configstore'
import { mainConstant } from '../../constant'
import { Log } from '../../util'
import * as pkg from '../../../package.json'
import defaultConfig from './defaultConfig'
import { baseInfo } from './modules/baseInfo'
import { luckyNumber } from './modules/luckyNumber'
import { handleTarget } from './modules/target'
import { history } from './modules/history'

const config = new ConfigStore(mainConstant.MAIN_CONF, defaultConfig)

export const mainInstall =  (program: commander.Command)=> {
    program
        .option('-e, --edit', 'edit main command config file')
}
export const noOptionHandle = async () => {
    clear()
    // 显示 logo
    Log.blue(figlet.textSync(pkg.name, {
        horizontalLayout: 'fitted',
        font: 'Train'
    }))
    // 基本信息
    baseInfo()
    // 显示lucky number
    if (config.get(mainConstant.MAIN_CONF_LUCKY_NUMBER)) {
        luckyNumber()
    }
    await history()
    // 显示目标
    if (config.get(mainConstant.MAIN_CONF_TARGET)) {
        handleTarget()
    }
}
export const mainHandle = (program: commander.Command)=> {
    if (program.edit) {
        child_process.spawn('vim', [config.path], {
            stdio: 'inherit'
        })
    }
}
