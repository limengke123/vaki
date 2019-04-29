const { Time } = require('./util')

const NAME_SPACE = 'VAKI_'
const CONF = 'CONF'
const DATA = 'DATA'

const getKeyFactory = namespace => key => namespace + key

// 主模块key
const getMainKey = getKeyFactory(NAME_SPACE + 'MAIN_')
// 子模块key
const getToolKey = getKeyFactory(NAME_SPACE + 'TOOL_')
const getTodoKey = getKeyFactory(NAME_SPACE + 'TODO_')
const getReadingKey = getKeyFactory(NAME_SPACE + 'READING_')

///------------------- main -------------------///
    ///----- main_conf -----///
const MAIN_CONF = getMainKey(CONF)
const MAIN_CONF_TARGET = 'target'
const MAIN_CONF_LUCKY_NUMBER = 'luckyNumber'

    ///----- main_data -----///
const MAIN_DATA = getMainKey(DATA)
const MAIN_DATA_LUCKY_NUMBER = 'luckyNumber'
const MAIN_DATA_DATE = 'date'
///------------------- main -------------------///


///------------------- tool -------------------///
    ///----- tool_name -----///
const TOOL_COMMAND_NAME = 'tool'

    ///----- tool_conf -----///
const TOOL_CONF = getToolKey(CONF)
///------------------- tool -------------------///



///------------------- todos -------------------///
    ///----- todos_name -----///
const TODO_COMMAND_NAME = 'todo'

    ///----- todos_conf -----///
const TODO_CONF = getTodoKey(CONF)

    ///----- todos_data -----///
const TODO_DATA = getTodoKey(DATA + Time.today)
const TODO_DATA_LIST = 'TODO_LIST'
///------------------- todos -------------------///


///------------------- reading -------------------///
    ///----- reading_name -----///
const READING_COMMAND_NAME = 'reading'
///------------------- reading -------------------///


module.exports = {
    mainConstant: {
        MAIN_CONF,
        MAIN_CONF_TARGET,
        MAIN_CONF_LUCKY_NUMBER,
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
    },
    readingConstant: {
        READING_COMMAND_NAME
    }
}
