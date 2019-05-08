const { Common, Time } = require('../../../util')
const pkg = require('../../../../package')
const updateNotifier = require('update-notifier')

exports.baseInfo = () => {
    console.log(Common.getTitle(pkg.name + ' v' + pkg.version, 'red'))
    const notifier = updateNotifier({pkg});
    if (notifier.update) {
        notifier.notify()
    }
    console.log(Common.getTitle('base'))
    console.log(Time.today)
}
