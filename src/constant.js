const NAME_SPACE = 'VAKI_';
const getKey = key => NAME_SPACE + key;

// 主模块
const MAIN_CONF = getKey('MAIN_CONF');
const MAIN_DATA = getKey('MAIN_DATA');

module.exports = {
    MAIN_CONF,
    MAIN_DATA
};
