import clear = require('clear')
import * as commander from 'commander'
import {dingdingConstant, helperConstant} from '../../constant'
import {Log} from '../../util'
import * as figlet from 'figlet'
import {drink} from './option/drink'

const helper = (option: any) => {
    if (option.drink) {
        drink()
    }
    if(option.parent.rawArgs.length === 3) {
        clear()
        Log.green(figlet.textSync(dingdingConstant.DINGDING_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero'
        }))
        option.help()
    }
}

export const helperInstall = (program: commander.Command) => {
    program
        .command(helperConstant.HELPER_COMMAND_NAME)
        .option('-d --drink', '提醒喝水小助手')
        .alias('h')
        .description('各种小助手的合集')
        .action(helper)
}
