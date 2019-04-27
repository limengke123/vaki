const opener = require('opener');
const { Helper } = require('../util');

const COMMAND_NAME = 'tool';

const tool = option => {
    if (option.open) {
        option.open.forEach(url => opener(url))
    }
};

exports.toolInstall = program => {
    program
        .command(COMMAND_NAME)
        .alias('o')
        .option('-o, --open <urls>', 'open the urls in browser', Helper.getArr)
        .description('some useful third part tools')
        .action(tool)
};
