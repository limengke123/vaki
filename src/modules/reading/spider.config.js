const segementFault = {
    url: 'https://segmentfault.com/hottest/weekly',
    rules: {
        list: 'div.news-list .news-item',
        rule: {
            url: {
                type: 'href',
                path: 'a.news-img'
            },
            title: {
                type: 'text',
                path: '.news__item-info h4.news__item-title'
            },
            stars: {
                type: 'text',
                path: 'span.votes-num.hot'
            }
        }
    }
}

module.exports = {
    segementFault
}
