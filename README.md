# pull-buffer-buffer

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
