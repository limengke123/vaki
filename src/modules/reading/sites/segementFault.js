const Araneida = require('araneida')
const { segementFault } = require('../spider.config')
const ora = require('ora')

const spinner = ora({
    spinner: 'dots',
    text: '拼命加载中...'
})

exports.segementFaultHandler = () => {
    const spider = new Araneida({
        links: segementFault,
        done: data => {
            spinner.stop();
            const result = data.map((item, index) => (index + 1) + '.' + item.title)
            console.log(result.join('\n'))
        }
    })
    spider.start()
    spinner.start()
}
