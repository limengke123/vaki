const chalk = require('chalk');
const ConfigStore = require('configstore');
const { mainConstant } = require('../../constant');
const { Time, Common } = require('../../util');

const config = new ConfigStore(mainConstant.MAIN_DATA);

exports.luckyNumber = () => {
    if (!config.get(mainConstant.MAIN_DATA_DATE)) {
        config.set(mainConstant.MAIN_DATA_DATE, Time.today)
    }
    if (config.get(mainConstant.MAIN_DATA_LUCKY_NUMBER) === undefined) {
        // 首次进来，从来没有设置过
        config.set(mainConstant.MAIN_DATA_LUCKY_NUMBER, Common.getLuckNumber())
    }
    if (config.get(mainConstant.MAIN_DATA_DATE) !== Time.today) {
        // 切换日期的时候需要更改
        config.set(mainConstant.MAIN_DATA_LUCKY_NUMBER, Common.getLuckNumber())
    }
    console.log(
        'today\'s lucky number:  ',
        chalk.underline.bold.red(config.get(mainConstant.MAIN_DATA_LUCKY_NUMBER))
    )
};
