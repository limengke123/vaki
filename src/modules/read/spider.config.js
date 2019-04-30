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

const microBlog = {
    url: 'https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6',
    rules: {
        list: 'tbody tr',
        rule: {
            rank: {
                type: 'text',
                path: '.td-01'
            },
            title: {
                type: 'text',
                path: '.td-02 a'
            },
            url: {
                type: 'href',
                path: '.td-02 a'
            },
            hot: {
                type: 'text',
                path: '.td-02 span'
            },
            label: {
                type: 'text',
                path: 'td-03 i'
            }
        }
    }
}

module.exports = {
    segementFault,
    microBlog
}
