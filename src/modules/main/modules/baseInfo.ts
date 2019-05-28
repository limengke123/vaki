const { Common, Time } = require('../../../util/index')
const pkg = require('../../../../package')
const updateNotifier = require('update-notifier')

export = {
    baseInfo: () => {
        console.log(Common.getTitle(pkg.name + ' v' + pkg.version, 'red'))
        const notifier = updateNotifier({pkg})
        if (notifier.update) {
            notifier.notify()
        }
    }
}
