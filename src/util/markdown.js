
class Markdown {
    constructor(text = '') {
        this.text = text
    }

    getText () {
        return this.text
    }

    addText (text, color) {
        text = text.replace(/\s/g, '&nbsp;')
        this.text += this._wrapperWithColor(text, color)
        return this
    }

    addRawText (text) {
        this.text += text
        return this
    }

    addCode (code, type = 'javascript') {
        const codeText = `
            \```${type}
                ${code}
            \```
        `
        this.text += codeText;
        return this
    }

    addComment (comment) {
        const commentText = `> ${comment}`
        this.text += commentText
        return this
    }

    addBoldText (text) {
        const boldText = `**${text}**`
        this.text += boldText
        return this
    }

    addItalicText (text) {
        const italicText = `*${text}*`
        this.text += italicText
        return this
    }

    /**
     * @summary 根据对象数组去获取markdown包装的文本
     * @param data - ${array} - 初始化的数组
     * @param columns - ${array} - 显示的表头
     * @return Markdown
     * */
    addTable (data, columns) {
        if (!Array.isArray(data)) {
            return this
        }
        const title = '|' + columns.map(item => item.show).join('|') + '|' + '\n'
        const dividingLine = '|' + columns.map(() => '---').join('|') + '|' + '\n'
        const body = data.map(item =>  {
            const { name, currentPrice, diff, rate, code } = item
            return '|' + columns.map(_item => {
                return item[_item.name]
            }).join('|') + '|'
        }).join('\n')
        const result = title + dividingLine + body
        this.text += result
        return this
    }

    addDividingLine (n = 1) {
        this.text += '---'.repeat(n)
        return this
    }

    _wrapperWithColor (text, color = '#333') {
        return `<font color=${color}>${text}</font>`
    }
}

module.exports = {
    Markdown
}
