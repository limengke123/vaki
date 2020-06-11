#!/usr/bin/env node
import * as program from 'commander'
import chalk from 'chalk'
import * as pkg from '../package.json'
import { noOptionHandle, mainInstall, mainHandle } from './modules/main'
import errorHandle from './error'
import { todoInstall } from './modules/todo'
import { stockInstall } from './modules/stock'
import { dingdingInstall } from './modules/dingding'
import { toolInstall } from './modules/tool'
import { readingInstall } from './modules/read'
import { helperInstall } from './modules/helper'

errorHandle()

program.version(
    chalk.underline.bold.white('v' + pkg.version),
    '-v, --version'
)

mainInstall(program)
// install sub-command
todoInstall(program)
stockInstall(program)
dingdingInstall(program)
toolInstall(program)
readingInstall(program)
helperInstall(program)

program.parse(process.argv)

mainHandle(program)

if (process.argv.length === 2) {
    noOptionHandle()
        .catch((err: Error) => {
            console.log(err.message)
        })
}

