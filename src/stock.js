const clear = require('clear');
const figlet = require('figlet');
const { Log } = require('./util');

const COMMAND_NAME = 'stock';

const stock = (option) => {
    clear();

    if(option.parent.rawArgs.length === 3) {
        Log.green(figlet.textSync(COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero'
        }));
        option.help();
    }
};

exports.stockInstall = program => {
    program
        .command(COMMAND_NAME)
        .option('-l, -list', 'list your custom stock')
        .description('a stock tool!')
        .action(stock);
};
