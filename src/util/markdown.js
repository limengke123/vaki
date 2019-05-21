
class Markdown {
    constructor(text = '') {
        this.text = text
    }

    getText () {
        return this.text
    }

    addText (text, color) {
        this.text += this._wrapperWithColor(text, color)
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
     * @return Markdown
     * */
    addTable (data) {
        if (!Array.isArray(data)) {
            return this
        }
        let title = Object.keys(data[0])
        // todo
        return this
    }

    _wrapperWithColor (text, color = '#333') {
        return `
            <font color="${color}">${text}</font>
        `
    }
}

module.exports = {
    Markdown
}
