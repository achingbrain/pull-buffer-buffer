# pull-resize-buffers

[![Build status](https://travis-ci.org/achingbrain/pull-resize-buffers.svg?branch=master)](https://travis-ci.org/achingbrain/pull-resize-buffers?branch=master) [![Coverage Status](https://coveralls.io/repos/github/achingbrain/pull-resize-buffers/badge.svg?branch=master)](https://coveralls.io/github/achingbrain/pull-resize-buffers?branch=master) [![Dependencies Status](https://david-dm.org/achingbrain/pull-resize-buffers/status.svg)](https://david-dm.org/achingbrain/pull-resize-buffers)

> Resizes streams of buffers

## Installation

```sh
$ npm install --save pull-resize-buffers
```

## Usage

```javascript
const pull = require('pull-streams/pull')
const values = require('pull-streams/values')
const collect = require('pull-streams/collect')
const resizeBuffers = require('pull-resize-buffers')

pull(

  // a source that emits Node.js Buffers of varying lengths
  values([Buffer.alloc(8192), Buffer.alloc(1024), ...]),

  // reformat the buffers to all be 4096 bytes long
  resizeBuffers(4096),

  collect((error, buffers) => {
    // `buffers` is an array of buffers all 4096 bytes long. The final buffer may be shorter
  })
)
```
