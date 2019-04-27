#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
const semver = require('semver');
const pkg = require('../package');
const { todoInstall } = require('./modules/todo');
const { stockInstall } = require('./modules/stock');
const { toolInstall } = require('./modules/tool');
const { error, Log } = require('./util');

if (!semver.satisfies(process.version, pkg.engines.node)) {
    error(
        `You are using Node ${process.version}, but vue-cli-service ` +
        `requires Node ${pkg.engines.node}.\nPlease upgrade your Node version.`
    );
    process.exit(1)
}

process.on('unhandleRejection', err => {
    console.log(chalk.red(err.message));
    process.exit(1);
});

program.version(pkg.version, '-v, --version');

// install sub-command
todoInstall(program);
stockInstall(program);
toolInstall(program);

program.parse(process.argv);

const subCmd = program.args[0];
if (!subCmd) {
    clear();
    Log.blue(figlet.textSync(pkg.name, {
        horizontalLayout: 'fitted',
        font: 'Train'
    }));
    program.help();
}
