# vaki &middot; [![npm version](https://img.shields.io/npm/v/vaki.svg)](https://www.npmjs.com/package/vaki) [![npm downloads](https://img.shields.io/npm/dy/vaki.svg)](https://www.npmjs.com/package/vaki) ![node version](https://img.shields.io/node/v/vaki.svg) [![license](https://img.shields.io/github/license/limengke123/vaki.svg)](https://github.com/limengke123/vaki/blob/master/LICENSE)

这个仓库包含一系列由 `node.js` 写的小脚本能帮助更方便使用终端。

[English](./README.md) | 简体中文

## 安装

```bash
$ npm i vaki -g
```

## 模块

1. [x] todo-list
2. [ ] stock
3. [ ] tool
4. [x] read

## 用法

### 待办列表

待办列表是一个简易的工具记录每日任务完成情况，它仅仅是帮助你去更好的管理时间以及更关注于有意义的事情。

```bash

# 列出所有待办事项
$ vaki todo --list

# 加上一项待办事项
$ vaki todo --add {item-name}

# 完成一项待办事项
$ vaki todo --complete {index}

# 删除一项待办事项
$ vaki todo --delete {index}

# 过滤待办事项

# 1. 筛选今日所有已完成事项
$ vaki todo --filter 1

# 2. 筛选今日未完成事项
$ vaki todo -filter

```

为了方便，`t` 是 `todo` 的简写，你可以用 `vaki t` 代替 `vaki todo`。

### 工具箱

工具模块集成一些有用的第三方工具。

1. [x] opener

```bash

# 在终端中打开一个或多个url
$ vaki tool --open {urls}

```

同样的，你也可以用 `o` 代替 `tool`。

### 阅读

在终端阅读一些有意思的内容：

1. [x] 微博
2. [x] segementFault

```bash

# 阅读微博热搜
$ vaki read -w

# 阅读 segementFault
$ vaki read -s

```

可以使用 `r` 来代替 `read`. 加上 `-l {number}` 去修改显示的内容长度。

