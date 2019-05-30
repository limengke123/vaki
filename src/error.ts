import * as semver from 'semver'
import { error } from './util'
import * as pkg from '../package.json'

const errorHandle = () => {
    if (!semver.satisfies(process.version, pkg.engines.node)) {
        error(
            `You are using Node ${process.version}, but vue-cli-service ` +
            `requires Node ${pkg.engines.node}.\nPlease upgrade your Node version.`
        )
        process.exit(1)
    }
    process.on('unhandledRejection', (reason, promise) => {
        console.log(reason)
        process.exit(1)
    })
}

export default errorHandle

