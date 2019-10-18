export interface tableData {
    name: string,
    currentPrice: string,
    diff: string,
    rate: string,
    code: string,
    [propName: string]: any
}
export interface columns {
    show: boolean,
    name: string
}
export class Markdown {

    private text: string

    constructor(text: string = '') {
        this.text = text
    }

    static getMarkdownInstant(): Markdown {
        return new Markdown()
    }

    getText ():string {
        return this.text
    }

    addText (text: string, color: string): this {
        text = text.replace(/\s/g, '&nbsp;')
        this.text += this.wrapperWithColor(text, color)
        return this
    }

    addRawText (text: string): this {
        this.text += text
        return this
    }

    addCode (code: string, type: string = 'javascript'): this {
        // @ts-ignore
        const codeText: string = `
            \```${type}
                ${code}
            \```
        `
        this.text += codeText
        return this
    }

    addImage(imgUrl: string, imgDesc?: string): this {
        imgDesc = imgDesc ? imgDesc : '图片描述'
        const img = `![${imgDesc}](${imgUrl})`
        this.text += img
        return this
    }

    addComment (comment: string): this {
        const commentText: string = `> ${comment}`
        this.text += commentText
        return this
    }

    addBoldText (text: string): this {
        const boldText: string = `**${text}**`
        this.text += boldText
        return this
    }

    addItalicText (text: string): this {
        const italicText: string = `*${text}*`
        this.text += italicText
        return this
    }

    /**
     * @summary 根据对象数组去获取markdown包装的文本
     * @param data - ${array} - 初始化的数组
     * @param columns - ${array} - 显示的表头
     * @return Markdown
     * */
    addTable (data: Array<tableData>, columns: Array<columns>): this {
        if (!Array.isArray(data)) {
            return this
        }
        const title: string = '|' + columns.map(item => item.show).join('|') + '|' + '\n'
        const dividingLine: string = '|' + columns.map(() => '---').join('|') + '|' + '\n'
        const body: string = data.map((item: tableData) =>  {
            const { name, currentPrice, diff, rate, code } = item
            return '|' + columns.map(_item => {
                return item[_item.name]
            }).join('|') + '|'
        }).join('\n')
        const result: string = title + dividingLine + body
        this.text += result
        return this
    }

    addDividingLine (n: number = 1): this {
        this.text += '---'.repeat(n)
        return this
    }

    private wrapperWithColor (text: string, color: string = '#333'): string {
        return `<font color=${color}>${text}</font>`
    }
}
