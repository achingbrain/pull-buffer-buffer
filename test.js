import resizeBuffers from './'
import bufferStream from 'pull-buffer-stream'
import test from 'ava'
import pull, {
  collect,
  error,
  empty
} from 'pull-stream'

test.cb('Should buffer bytes when incoming is smaller than requested size', (t) => {
  const incomingNumBytes = 4096
  const incomingChunkSize = 512
  const expectedChunkSize = 1024
  let data = Buffer.alloc(0)

  pull(
    bufferStream(incomingNumBytes, {
      chunkSize: incomingChunkSize,
      collector: (buffer) => {
        data = Buffer.concat([data, buffer])
      }
    }),
    resizeBuffers(expectedChunkSize),
    collect((error, buffers) => {
      t.falsy(error)

      buffers.forEach(buffer => {
        t.is(buffer.length, expectedChunkSize)
      })

      t.is(incomingNumBytes, buffers.reduce((acc, cur) => acc + cur.length, 0))
      t.deepEqual(data, Buffer.concat(buffers))

      t.end()
    })
  )
})

test.cb('Should buffer bytes when incoming is larger than requested size', (t) => {
  const incomingNumBytes = 4096
  const incomingChunkSize = 2048
  const expectedChunkSize = 1024
  let data = Buffer.alloc(0)

  pull(
    bufferStream(incomingNumBytes, {
      chunkSize: incomingChunkSize,
      collector: (buffer) => {
        data = Buffer.concat([data, buffer])
      }
    }),
    resizeBuffers(expectedChunkSize),
    collect((error, buffers) => {
      t.falsy(error)

      buffers.forEach(buffer => {
        t.is(buffer.length, expectedChunkSize)
      })

      t.is(incomingNumBytes, buffers.reduce((acc, cur) => acc + cur.length, 0))
      t.deepEqual(data, Buffer.concat(buffers))

      t.end()
    })
  )
})

test.cb('Should buffer bytes when incoming bytes are not divisible by requested chunk size', (t) => {
  const incomingNumBytes = 4097
  const incomingChunkSize = 2048
  const expectedChunkSize = 1024
  let data = Buffer.alloc(0)

  pull(
    bufferStream(incomingNumBytes, {
      chunkSize: incomingChunkSize,
      collector: (buffer) => {
        data = Buffer.concat([data, buffer])
      }
    }),
    resizeBuffers(expectedChunkSize),
    collect((error, buffers) => {
      t.falsy(error)

      buffers.forEach((buffer, index) => {
        if (index === 4) {
          t.is(buffer.length, 1)
        } else {
          t.is(buffer.length, expectedChunkSize)
        }
      })

      t.is(incomingNumBytes, buffers.reduce((acc, cur) => acc + cur.length, 0))
      t.deepEqual(data, Buffer.concat(buffers))

      t.end()
    })
  )
})

test.cb('Should propagate stream errors', (t) => {
  const streamError = new Error('Urk!')

  pull(
    error(streamError),
    resizeBuffers(100),
    collect((error) => {
      t.is(error, streamError)
      t.end()
    })
  )
})

test.cb('Should survive stream ending', (t) => {
  pull(
    empty(),
    resizeBuffers(100),
    collect((error, buffers) => {
      t.falsy(error)
      t.is(buffers.length, 0)
      t.end()
    })
  )
})
