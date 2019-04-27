/**
 * @file todo-app
 * @example add a todo-item
 * van todo -a {todo-name}
 * @example list todo-list
 * van todo -l
 * @example delete a todo-item
 * van todo -d {index | key}
 * @example complete a todo-item
 * van todo -c {index | key}
 * */
const ConfigStore = require('configstore');
const figlet = require('figlet');
const clear = require('clear');
const pkg = require('../../package');
const { Helper, Time, error, Log } = require('../util');

const TODO_LIST = 'TODO_LIST';
const COMMAND_NAME = 'todo';
const storeKey = pkg.name + Time.today;

const config = new ConfigStore(storeKey, {[TODO_LIST]: []});

const todo = (option) => {
    clear()
    if (option.add) {
        try {
            let todoList = config.get(TODO_LIST);
            const arr = option.add.map(item => ({
                text: item,
                isComplete: false,
            }));
            todoList = todoList.concat(...arr);
            config.set(TODO_LIST, todoList);
            console.log('add success');
        } catch (e) {
            error(e.message);
        }
    }
    if (option.delete) {
        try {
            const indexArg = option.delete - 1;
            let todoList = config.get(TODO_LIST);
            todoList.splice(indexArg, 1);
            config.set(TODO_LIST, todoList);
            console.log('delete success')
        } catch (e) {
            error(e.message);
        }
    }
    if (option.list) {
        const todoList = config.get(TODO_LIST);
        const result = todoList.map((item ,index) => {
            const showIndex = index + 1;
            return showIndex + '. ' + item.text + ' ' + 'complete: ' + item.isComplete;
        });
        console.log(
            result.join('\n')
        );
    }
    if (option.complete) {
        try {
            let todoList = config.get(TODO_LIST);
            const indexArg = option.complete - 1;
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
                return item;
            });
            config.set(TODO_LIST, todoList);
        } catch (e) {
            error(e.message);
        }
    }

    if (option.path) {
        console.log(config.path);
    }
    if (option.parent.rawArgs.length === 3) {
        // 没有输入的时候
        Log.green(figlet.textSync(COMMAND_NAME, {
            horizontalLayout: 'fitted',
            font: 'Sub-Zero',
        }));
        option.help();
    }
};

exports.todoInstall = program => {
    program
        .command(COMMAND_NAME)
        .alias('t')
        .option('-a, --add <items>', 'add a todo-item', Helper.getArr)
        .option('-l, --list', 'list out today todo-list')
        .option('-d --delete <n>', 'delete a todo-item', parseInt)
        .option('-c, --complete <n>', 'complete a todo-item', parseInt)
        .option('-p, --path', 'show the data file path')
        .description('a todo-list app!')
        .action(todo);
};
