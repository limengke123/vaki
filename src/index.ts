#!/usr/bin/env node
import * as program from 'commander'
import * as chalk from 'chalk'
const pkg = require('../package')
import { noOptionHandle, mainInstall, mainHandle } from './modules/main'
import errorHandle from './error'
import { todoInstall } from './modules/todo'
import { stockInstall } from './modules/stock'
import { dingdingInstall } from './modules/dingding'
import { toolInstall } from './modules/tool'
import { readingInstall } from './modules/read'

errorHandle()

program.version(
    // @ts-ignore
    chalk.underline.bold.greenBright('v' + pkg.version),
    '-v, --version'
)

mainInstall(program)
// install sub-command
todoInstall(program)
stockInstall(program)
dingdingInstall(program)
toolInstall(program)
readingInstall(program)

program.parse(process.argv)

mainHandle(program)

if (process.argv.length === 2) {
    noOptionHandle()
        .catch((err: Error) => {
            console.log(err.message)
        })
}

