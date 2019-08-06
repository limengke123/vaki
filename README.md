# vaki &middot; [![npm version](https://img.shields.io/npm/v/vaki.svg)](https://www.npmjs.com/package/vaki) [![npm downloads](https://img.shields.io/npm/dy/vaki.svg)](https://www.npmjs.com/package/vaki) ![node version](https://img.shields.io/node/v/vaki.svg) [![license](https://img.shields.io/github/license/limengke123/vaki.svg)](https://github.com/limengke123/vaki/blob/master/LICENSE)

This repository contains a collection of tiny script for use with `node.js` that help work with terminal freely.

English | [简体中文](./README-zh_CN.md)

## Installation

```bash
$ npm i vaki -g
```

## Module

1. [x] todo-list
2. [x] stock
3. [x] tool
4. [x] read

## Usage

### todo-list

Todo-list is a simple app that notes what your have done or not done today, it's just help you to manage your time and focus on meaningful things.

```bash

# list out all the todo-items
$ vaki todo --list

# add a todo-item into list
$ vaki todo --add {item-name}

# complete a todo-item
$ vaki todo --complete {index}

# delete a todo-item
$ vaki todo --delete {index}

# filter todo-list

# 1. filter all the item you had done today
$ vaki todo --filter 1

# 2. filter all the item you did not complete yet today
$ vaki todo -filter

```

For convenience, `t` is alias for `todo`, you can just use `vaki t` instead of `vaki todo`.

### tool

Tool module is integrated with some useful third part tools:

1. [x] opener

```bash

# open a link or links in the terminal
$ vaki tool --open {urls}

```

Also you can use `o` instead of `tool`.

### read

Reading some thing interesting in the terminal:

1. [x] microBlog
2. [x] segementFault

```bash

# --weibo
# read microBlog news
$ vaki read -w

# --segementFault
# read segementFault
$ vaki read -s

```

You can still use `r` instead of `read`. 

### stock

fetch stock info:

```bash

# --add
# add stock code
$ vaki stock -a

# --show
# show stock info in the terminal
# if add -sw, can always fetch info
$ vaki stock -s

# --message
# if you have put dingtalk token into, refer to command of dingtalk
# this will call dingtalk api and then send code message to your dingtalk group by robot
$ vaki stock -m

```

You can still use `s` instead of `stock`. 

### dingtalk

this is a dingtalk token manager, you can add dingtalk token here thus you can send stock info to your dingtalk group by robot, refer to command of stock --message

```bash

# --add
# add dingtalk token into list
$ vaki dingtalk -a

# --show
# show  dingtalk token list
$ vaki dingtalk -s

# --remove
# remove dingtalk token in the list
$ vaki dingtalk -r

```


You can still use `d` instead of `dingtalk`.  

