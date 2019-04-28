const chalk = require('chalk');
const ConfigStore = require('configstore');
const { MAIN_DATA } = require('../../constant');
const { Time, Common } = require('../../util');

const config = new ConfigStore(MAIN_DATA);

const date = 'date';
const luckyNumber = 'luckyNumber';

exports.luckyNumber = () => {
    if (!config.get(date)) {
        config.set(date, Time.today)
    }
    if (config.get(luckyNumber) === undefined) {
        // 首次进来，从来没有设置过
        config.set(luckyNumber, Common.getLuckNumber())
    }
    if (config.get(date) !== Time.today) {
        // 切换日期的时候需要更改
        config.set(luckyNumber, Common.getLuckNumber())
    }
    console.log(
        'today\'s lucky number:  ',
        chalk.underline.bold.red(config.get(luckyNumber))
    )
};
