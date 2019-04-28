const semver = require('semver');
const chalk = require('chalk');
const { error } = require('./util');
const pkg = require('../package');

exports.errorHandle = () => {
    if (!semver.satisfies(process.version, pkg.engines.node)) {
        error(
            `You are using Node ${process.version}, but vue-cli-service ` +
            `requires Node ${pkg.engines.node}.\nPlease upgrade your Node version.`
        );
        process.exit(1)
    }
    console.log('handle error');

    process.on('unhandleRejection', err => {
        console.log(chalk.red(err.message));
        process.exit(1);
    });
};

