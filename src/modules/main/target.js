const ConfigStore = require('configstore')
const { todoConstant, mainConstant } = require('../../constant')

const mainConfConfig = new ConfigStore(mainConstant.MAIN_CONF)
const todoConfig = new ConfigStore(todoConstant.TODO_DATA)

let target = mainConfConfig.get(mainConstant.MAIN_CONF_TARGET)
const todoList = todoConfig.get(todoConstant.TODO_DATA_LIST)

exports.target = () => {
    if (todoList.length) {
        target = parseInt(target)
        let result = todoList.filter(item => !item.isComplete)
        if (result.length) {
            for (let i = 0; i < target && i < result.length; i++) {
                const item = result[i]
                console.log(
                    `${i + 1}. `,
                    item.text
                )
            }
            if (result.length > target) {
                console.log('...')
            }
        } else {
            console.log('you had done all the target today!')
        }
    } else {
        console.log('you haven\'t add any todo-item today yet')
    }
}
