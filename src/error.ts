const semver = require('semver')
const chalk = require('chalk')
const { error } = require('./util/index')
const pkg = require('../package')

const errorHandle = () => {
    if (!semver.satisfies(process.version, pkg.engines.node)) {
        error(
            `You are using Node ${process.version}, but vue-cli-service ` +
            `requires Node ${pkg.engines.node}.\nPlease upgrade your Node version.`
        )
        process.exit(1)
    }
    // @ts-ignore
    process.on('unhandledRejection', (err: { message: string; }) => {
        console.log(chalk.red(err.message))
        process.exit(1)
    })
}

export default errorHandle

