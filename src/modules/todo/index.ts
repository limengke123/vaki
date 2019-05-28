import commander = require('commander')
const ConfigStore = require('configstore')
const figlet = require('figlet')
const clear = require('clear')
const { Helper, error, Log } = require('../../util/index')
const { todoConstant } = require('../../constant')
const { add } = require('./option/add')

const config = new ConfigStore(todoConstant.TODO_DATA, {[todoConstant.TODO_DATA_LIST]: []})

const index = (option: any) => {
    if (option.add) {
        add(option)
    }
    if (option.delete) {
        try {
            const indexArg = option.delete - 1
            let todoList = config.get(todoConstant.TODO_DATA_LIST)
            todoList.splice(indexArg, 1)
            config.set(todoConstant.TODO_DATA_LIST, todoList)
            console.log('delete success')
        } catch (e) {
            error(e.message)
        }
    }
    if (option.list) {
        const todoList: Array<any> = config.get(todoConstant.TODO_DATA_LIST)
        let result = todoList.map((item ,index) => {
            const showIndex = index + 1
            return {
                ...item,
                index: showIndex
            }
        })
        if (option.filter) {
            if (option.filter === '1') {
                result = result.filter(item => item.isComplete)
            } else {
                result = result.filter(item => !item.isComplete)
            }
        }
        result = result.map(item => {
            const {
                index,
                text,
                isComplete
            } = item
            return index + '. ' + text + ' ' + 'complete: ' + isComplete
        })
        console.log(
            result.join('\n')
        )
    }
    if (option.complete) {
        try {
            let todoList: Array<any> = config.get(todoConstant.TODO_DATA_LIST)
            const indexArg = option.complete - 1
            if (indexArg > todoList.length) {
                return error('没有这个todo-item')
            }
            todoList = todoList.map((item, index) => {
                if (index === indexArg) {
                    return {
                        ...item,
                        isComplete: !item.isComplete
                    }
                }
                return item
            })
            config.set(todoConstant.TODO_DATA_LIST, todoList)
        } catch (e) {
            error(e.message)
        }
    }

    if (option.path) {
        console.log(config.path)
    }
    if (option.parent.rawArgs.length === 3) {
        // 没有输入的时候
        clear()
        Log.green(figlet.textSync(todoConstant.TODO_COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero',
        }))
        option.help()
    }
}

exports.todoInstall = (program: commander.Command) => {
    program
        .command(todoConstant.TODO_COMMAND_NAME)
        .alias('t')
        .option('-a, --add [items]', 'add a todo-item', Helper.getArr)
        .option('-l, --list', 'list out today todo-list')
        .option('-d --delete <n>', 'delete a todo-item', parseInt)
        .option('-c, --complete <n>', 'complete a todo-item', parseInt)
        .option('-p, --path', 'show the data file path')
        .option('-f, --filter [isComplete]', 'filter your todo-item by whether is completed')
        .description('a todo-list app!')
        .action(index)
}
