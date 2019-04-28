const child_process = require('child_process');
const clear = require('clear');
const figlet = require('figlet');
const ConfigStore = require('configstore');
const { mainConstant } = require('../../constant');
const { Log } = require('../../util');
const pkg = require('../../../package');
const defaultConfig = require('./defaultConfig');
const { luckyNumber } = require('./luckyNumber');

const config = new ConfigStore(mainConstant.MAIN_CONF, defaultConfig);

exports.mainInstall = program => {
    program
        .option('-e, --edit', 'edit main command config file')
};

exports.noOptionHandle = () => {
    clear();
    // 显示 logo
    Log.blue(figlet.textSync(pkg.name, {
        horizontalLayout: 'fitted',
        font: 'Train'
    }));
    // 显示lucky number
    if (config.get('luckyNumber')) {
        luckyNumber()
    }
};

exports.mainHandle = program => {
    if (program.edit) {
        child_process.spawn('vim', [config.path], {
            stdio: 'inherit'
        })
    }
};

