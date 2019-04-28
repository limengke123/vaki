#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package');
const { todoInstall } = require('./modules/todo');
const { stockInstall } = require('./modules/stock');
const { toolInstall } = require('./modules/tool');
const { mainHandle } = require('./modules/main/index');
const { errorHandle } = require('./error');

errorHandle();

program.version(pkg.version, '-v, --version');

// install sub-command
todoInstall(program);
stockInstall(program);
toolInstall(program);

program.parse(process.argv);

const subCmd = program.args[0];
if (!subCmd) {
    mainHandle();
}
