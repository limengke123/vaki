import * as commander from 'commander'
import clear = require('clear')
import * as figlet from 'figlet'
import { stockConstant } from '../../constant'
import { Log } from '../../util'
import { add } from './option/add'
import { show } from './option/show'
import { message } from './option/message'

const stock = (option: any) => {
    if (option.add) {
        add()
    }
    if (option.show) {
        show(option.watch)
    }

    if (option.message) {
        message()
    }

    if(option.parent.rawArgs.length === 3) {
        clear()
        Log.green(figlet.textSync(stockConstant.STOCK_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero'
        }))
        option.help()
    }
}

export const stockInstall = (program: commander.Command) => {
    program
        .command(stockConstant.STOCK_COMMAND_NAME)
        .option('-a --add', 'add stock code into list')
        .option('-s --show', 'show all the stock you had added')
        .option('-w --watch', 'show stock info with setInterval')
        .option('-m --message', 'send all the stock you had added to dingding')
        .alias('s')
        .description('a stock tool!')
        .action(stock)
}
