# vaki

This repository contains a collection of tiny script for use with `node.js` that help work with terminal freely.

## Installation

```bash
$ npm i vaki -g
```

## Module

1. [x] todo-list
2. [ ] stock

## Usage

### todo-list

```bash

# list out all the todo-items
$ vaki todo --list

# add a todo-item into list
$ vaki todo --add {item-name}

# complete a todo-item
$ vaki todo --complete {index}

# delete a todo-item
$ vaki todo --delete {index}

```

For convenience, `t` is alias for `todo`, you can just use `vaki t` instead of `vaki todo`.

