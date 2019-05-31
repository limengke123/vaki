import * as clear from 'clear'
import * as figlet from 'figlet'
import * as commander from 'commander'
import { dingdingConstant } from '../../constant'
import { Log } from '../../util'
import { add } from './option/add'
import { show } from './option/show'
import { remove } from './option/remove'

const dingding = (option: any) => {
    if (option.add) {
        add()
    }

    if (option.show) {
        show()
    }
    if (option.remove) {
        remove()
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

export const dingdingInstall = (program: commander.Command)=> {
    program
        .command(dingdingConstant.DINGDING_COMMAND_NAME)
        .option('-a --add', 'add webhooks into list')
        .option('-r --remove', 'remove a webhooks from list')
        .option('-s --show', 'show all the webhooks you had added')
        .alias('d')
        .description('a dingding tool!')
        .action(dingding)
}
