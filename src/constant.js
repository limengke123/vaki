const { Time } = require('./util');

const NAME_SPACE = 'VAKI_';
const CONF = 'CONF';
const DATA = 'DATA';

const getKeyFactory = namespace => key => namespace + key;

// 主模块key
const getMainKey = getKeyFactory(NAME_SPACE + 'MAIN_');
// 子模块key
const getToolKey = getKeyFactory(NAME_SPACE + 'TOOL_');
const getTodoKey = getKeyFactory(NAME_SPACE + 'TODO_');

// 主模块
const MAIN_CONF = getMainKey(CONF);
const MAIN_DATA = getMainKey(DATA);
const MAIN_DATA_LUCKY_NUMBER = 'luckyNumber';
const MAIN_DATA_DATE = 'date';

// tool
const TOOL_CONF = getToolKey(CONF);
const TOOL_COMMAND_NAME = 'tool';

// todos
const TODO_CONF = getTodoKey(CONF);
const TODO_DATA = getTodoKey(DATA + Time.today);
const TODO_DATA_LIST = 'TODO_LIST';
const TODO_COMMAND_NAME = 'todo';

module.exports = {
    mainConstant: {
        MAIN_CONF,
        MAIN_DATA,
        MAIN_DATA_LUCKY_NUMBER,
        MAIN_DATA_DATE
    },
    toolConstant: {
        TOOL_CONF,
        TOOL_COMMAND_NAME
    },
    todoConstant: {
        TODO_CONF,
        TODO_DATA,
        TODO_DATA_LIST,
        TODO_COMMAND_NAME
    }
};
