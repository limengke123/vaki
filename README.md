# vaki &middot; [![npm version](https://img.shields.io/npm/v/vaki.svg)](https://www.npmjs.com/package/vaki) [![npm downloads](https://img.shields.io/npm/dy/vaki.svg)](https://www.npmjs.com/package/vaki) ![node version](https://img.shields.io/node/v/vaki.svg) [![license](https://img.shields.io/github/license/limengke123/vaki.svg)](https://github.com/limengke123/vaki/blob/master/LICENSE)

This repository contains a collection of tiny script for use with `node.js` that help work with terminal freely.

English | [简体中文](./README-zh_CN.md)

## Installation

```bash
$ npm i vaki -g
```

## Module

1. [x] todo-list
2. [ ] stock
3. [ ] tool

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

