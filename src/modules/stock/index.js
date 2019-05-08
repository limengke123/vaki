const clear = require('clear')
const figlet = require('figlet')
const { stockConstant } = require('../../constant')
const { Log } = require('../../util')
const { add } = require('./option/add')
const { show } = require('./option/show')

const stock = (option) => {
    if (option.add) {
        add(option);
    }
    if (option.show) {
        show(option)
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

exports.stockInstall = program => {
    program
        .command(stockConstant.STOCK_COMMAND_NAME)
        .option('-a --add', 'add stock code into list')
        .option('-s --show', 'show all the stock you had added')
        .alias('s')
        .description('a stock tool!')
        .action(stock)
}
