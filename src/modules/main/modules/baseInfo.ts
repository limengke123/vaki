import { Common, Time } from '../../../util'
import pkg from '../../../../package.json'
import * as updateNotifier from 'update-notifier'

export const baseInfo = () => {
    console.log(Common.getTitle(pkg.name + ' v' + pkg.version, 'red'))
    const notifier = updateNotifier({pkg})
    if (notifier.update) {
        notifier.notify()
    }
}

