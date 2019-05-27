const chalk = require('chalk')
const axios = require('axios')
const ConfigStore = require('configstore')
const { mainConstant } = require('../../../constant')
const { Common, Time } = require('../../../util')

const key = 'HISTORY'
const config = new ConfigStore(mainConstant.MAIN_DATA, {[key]: []})

const handleContent = content => {
    content.forEach((item, index) => {
        let space = ' '
        if (index < 9) {
            space += ' '
        }
        const number = index + 1 + '.' + space
        console.log(number + item)
    })
}

exports.history = () => {
    const url = 'https://api.ooopn.com/history/api.php?type=json'
    console.log(Common.getTitle('history in today'))
    console.log(Time.today )
    if (!config.get(key)) {
        return Promise.resolve(config.get(key))
            .then(content => {
                handleContent(content)
            })
    }
    return axios.get(url)
        .then(res => {
            const { content } = res.data
            config.set(key, content)
            handleContent(content)
        })

}
