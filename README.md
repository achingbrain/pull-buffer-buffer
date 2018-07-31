# pull-buffer-buffer

[![Build status](https://travis-ci.org/achingbrain/pull-buffer-buffer.svg?branch=master)](https://travis-ci.org/achingbrain/pull-buffer-buffer.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/achingbrain/pull-buffer-buffer/badge.svg?branch=master)](https://coveralls.io/github/achingbrain/pull-buffer-buffer?branch=master) [![Dependencies Status](https://david-dm.org/achingbrain/pull-buffer-buffer/status.svg)](https://david-dm.org/achingbrain/pull-buffer-buffer)

> Buffers buffers

## Installation

```sh
$ npm install --save pull-buffer-buffer
```

## Usage

```javascript
const pull = require('pull-streams/pull')
const buffer = require('pull-buffer-buffer')

module.exports = (source, callback) => {
  return pull(

    // `source` is a pull stream source that emits node Buffers of varying lengths
    source,

    // Reformat the buffers to all be 4096 bytes long. The final buffer may be less than this.
    buffer(4096)
  )
}
```
