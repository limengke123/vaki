const { Common, Time } = require('../../../util')
const pkg = require('../../../../package')

exports.baseInfo = () => {
    console.log(Common.getTitle(pkg.name + ' v' + pkg.version, 'red'))
    console.log(Common.getTitle('base'))
    console.log(Time.today)
}
