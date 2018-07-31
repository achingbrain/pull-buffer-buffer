'use strict'

const bufferBuffers = (size) => {
  let queue = []
  let next = Buffer.alloc(0)
  let ended = false

  const onBuffer = (read, callback) => {
    return (error, buffer) => {
      if (error) {
        if (next.length !== 0) {
          queue.push(next)
        }

        if (error === true && queue.length) {
          // the source stream ended, return what we've got then finish
          ended = true

          return callback(null, queue.shift())
        }

        // an actual error occurred, or we don't have anything to
        return callback(error)
      }

      next = Buffer.concat([next, buffer])

      while (next.length >= size) {
        // queue available bytes
        const slice = next.slice(0, size)
        next = next.slice(size)

        queue.push(slice)
      }

      // haven't read enough bytes yet
      if (next.length !== 0) {
        return read(null, onBuffer(read, callback))
      }

      // return the bytes
      callback(null, queue.shift())
    }
  }

  return (read) => {
    return (abort, callback) => {
      if (abort || (ended && queue.length === 0)) {
        return callback(true) // eslint-disable-line standard/no-callback-literal
      }

      if (queue.length > 0) {
        return callback(null, queue.shift())
      }

      read(null, onBuffer(read, callback))
    }
  }
}

module.exports = bufferBuffers
