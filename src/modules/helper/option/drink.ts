import * as schedule from 'node-schedule'
import * as ConfigStore from 'configstore'
import axios from 'axios'
import {dingdingConstant} from '../../../constant'
import {Markdown} from '../../../util'

const dingdingConfig = new ConfigStore(dingdingConstant.DINGDING_CONF, {webhooks: []})

let hangup = function (time: number = 1000 * 60 * 60) {
    setTimeout(() => {
        hangup(time)
    }, time)
}
export const drink = () => {
    const rule = new schedule.RecurrenceRule()
    rule.second = [1]
    rule.minute = [35]
    rule.hour = [
        9,
        10,
        11,
        13,
        14,
        15,
        16,
        17,
    ]
    rule.dayOfWeek = [1, 2, 3, 4, 5, 6, 7]
    console.log('开始今日的喝水提醒...')
    schedule.scheduleJob(rule, () => {
        const webhooks: Array<string> = dingdingConfig.get('webhooks')
        if (!webhooks.length) {
            return console.log('you haven\'t add any webhook yet')
        }
        webhooks.forEach(url => {
            axios.post(url, {
                msgtype: 'markdown',
                markdown: {
                    title: 'vaki提醒你喝水啦',
                    text: Markdown.getMarkdownInstant().addImage(
                        'https://assets.souche.com/assets/sccimg/tiger-workbench/1111.jpeg',
                        '每日喝水提醒'
                    ).getText()
                },
                at: {
                    isAtAll: true
                }
            })
        })
        console.log('嘻嘻嘻，你该去喝水了')
    })
    hangup()
}

