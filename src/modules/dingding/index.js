const clear = require('clear')
const figlet = require('figlet')
const { dingdingConstant } = require('../../constant')
const { Log } = require('../../util/index')
const { add } = require('./option/add')
const { show } = require('./option/show')

const dingding = (option) => {
    if (option.add) {
        add(option)
    }
    if (option.show) {
        show(option)
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

exports.dingdingInstall = program => {
    program
        .command(dingdingConstant.DINGDING_COMMAND_NAME)
        .option('-a --add', 'add webhooks into list')
        .option('-s --show', 'show all the webhooks you had added')
        .alias('d')
        .description('a dingding tool!')
        .action(dingding)
}
