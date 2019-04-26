#!/usr/bin/env node
const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const semver = require('semver');
const pkg = require('../package');
const { todo } = require('./todo');
const { stock } = require('./stock');
const { error } = require('./util');

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

program
    .command('todo [name]')
    .option('-a, --add', 'add a todo-item')
    .description('a todo-list app!')
    .action(todo);

program
    .command('stock')
    .option('-l, -list', 'list your custom stock')
    .description('a stock tool!')
    .action(stock);

program.parse(process.argv);
