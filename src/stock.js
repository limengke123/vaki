const stock = () => {
    console.log('your are at stock module');
};

exports.stockInstall = program => {
    program
        .command('stock')
        .option('-l, -list', 'list your custom stock')
        .description('a stock tool!')
        .action(stock);
};
