#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const pkg = require('../package')
const { noOptionHandle, mainInstall, mainHandle } = require('./modules/main/index')
const { errorHandle } = require('./error')
const { todoInstall } = require('./modules/todo')
const { stockInstall } = require('./modules/stock')
const { toolInstall } = require('./modules/tool/index')
const { readingInstall } = require('./modules/read/index')

errorHandle()

program.version(
    chalk.underline.bold.greenBright('v' + pkg.version),
    '-v, --version'
)

mainInstall(program)
// install sub-command
todoInstall(program)
stockInstall(program)
toolInstall(program)
readingInstall(program)

program.parse(process.argv)

mainHandle(program)

if (process.argv.length === 2) {
    noOptionHandle(program)
}
