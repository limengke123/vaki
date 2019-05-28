const ConfigStore = require('configstore')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { todoConstant } = require('../../../constant')

const config = new ConfigStore(todoConstant.TODO_DATA, {[todoConstant.TODO_DATA_LIST]: []})

exports.add = (option: any) => {
    let todoList = config.get(todoConstant.TODO_DATA_LIST)
    if (option.add === true) {
        // 没有传值的时候，用交互式的提交方式
        inquirer.prompt({
            type: 'input',
            name: 'text',
            message: 'input your todo-item'
        }).then((answer: {text: string}) => {
            const { text } = answer
            const item = {
                text: text,
                isComplete: false
            }
            todoList.push(item)
            config.set(todoConstant.TODO_DATA_LIST, todoList)
            console.log(chalk.green(`you have successfully add "${text}" into todo-list`))
        })
    } else {
        const arr = option.add.map((item: any) => ({
            text: item,
            isComplete: false,
        }))
        const text: string = option.add.join(', ')
        todoList = todoList.concat(...arr)
        config.set(todoConstant.TODO_DATA_LIST, todoList)
        console.log(`you have successfully add "${text}" into todo-list`)
    }
}
