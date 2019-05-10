const dytt = {
    url: 'http://s.ygdy8.com/plus/so.php?typeid=1&keyword=',
    rules: {
        list: '.co_content8 ul table',
        rule: {
            url: {
                type: 'href',
                path: 'a'
            },
            title: {
                type: 'text',
                path: 'a'
            }
        }
    }
}

module.exports = {
    dytt,
}
