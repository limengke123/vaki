const clear = require('clear');
const figlet = require('figlet');
const { Log } = require('../../util');
const pkg = require('../../../package');
const { luckyNumber } = require('./luckyNumber');

exports.mainHandle = () => {
    clear();
    // 显示 logo
    Log.blue(figlet.textSync(pkg.name, {
        horizontalLayout: 'fitted',
        font: 'Train'
    }));
    // 显示lucky number
    luckyNumber()
};
