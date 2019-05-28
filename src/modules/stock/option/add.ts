const inquire = require('inquirer')
const ConfigStore = require('configstore')
const chalk = require('chalk')
const { getStockByCode } = require('../api')
const { stockConstant } = require('../../../constant')

const config = new ConfigStore(stockConstant.STOCK_CONF, {mine: []})

export = {
    add: () => {
        // @ts-ignore
        // @ts-ignore
        inquire.prompt({
            type: 'input',
            message: 'input your stock-code',
            name: 'code'
        }).then((answer: {code: string}) => {
            const { code } = answer
            return getStockByCode(code)
        }).then((res: {name: string, code: string}) => {
            return Promise.all([
                Promise.resolve(res),
                inquire.prompt({
                    type: 'confirm',
                    message: `are you sure add ${res.name} / ${res.code}`,
                    name: 'check'
                })
            ])
        }).then((data: Array<any>) => {
            const [info, answer] = data
            if (answer.check) {
                //
                const { name, code }= info
                const mine: Array<string> = config.get('mine')
                if (mine.indexOf(code) > -1) {
                    console.log(chalk.red(`已经添加过${name} / ${code}了, 无须重复添加`))
                } else {
                    mine.push(code)
                    config.set('mine', mine)
                    console.log(chalk.blue(`成功添加了${name} / ${code} 到自选了`))
                }
            }
        }).catch((err: Error) => {
            console.log('error', err)
        })
    }
}
