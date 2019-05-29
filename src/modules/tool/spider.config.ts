export const dytt = {
    url: 'http://s.ygdy8.com/plus/so.php?kwtype=0&searchtype=title&keyword=',
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

export const douban = {
    url: 'https://www.douban.com/search?q=',
    rules: {
        list: '.result-list .result',
        rule: {
            introduction: {
                type: 'text',
                path: '.content p'
            },
            title: {
                type: 'text',
                path: '.title > h3 > a'
            },
            tag: {
                type: 'text',
                path: '.title > h3 > span:nth-child(1)',
                trim: true
            },
            link: {
                type: 'href',
                path: '.title > h3 > a'
            },
            rateNumber: {
                type: 'text',
                path: '.rating-info .rating_nums'
            },
            rateMan: {
                type: 'text',
                path: '.rating-info .rating_nums+span'
            },
            subjectCast: {
                type: 'text',
                path: '.rating-info .subject-cast'
            }
        }
    }
}

export const doubanMovieDetail = {
    rules: {
        rule: {
            director: {
                type: 'text',
                path: '#info > span:nth-child(1) > span.attrs > a'
            },
            screenwriter: {
                type: 'text',
                path: '#info > span:nth-child(3) > span.attrs'
            },
            actor: {
                type: 'text',
                path: '#info > span.actor > span.attrs'
            },
            genre: {
                type: 'text',
                path: '#info > span[property="v:genre"]'
            }
        }
    }
}

