const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.argv[2] || process.env.PORT || 5173
const root = path.join(__dirname, 'dist')

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon'
}

function sendFile(filePath, res) {
  const ext = path.extname(filePath)
  const type = mime[ext] || 'application/octet-stream'
  res.setHeader('Content-Type', type)
  // advertise byte-range support
  res.setHeader('Accept-Ranges', 'bytes')
  const stream = fs.createReadStream(filePath)
  stream.on('error', () => {
    res.writeHead(500)
    res.end('Server error')
  })
  stream.pipe(res)
}

const server = http.createServer((req, res) => {
  try {
    let reqUrl = decodeURIComponent(req.url.split('?')[0])
    console.log('REQ URL:', req.url, '-> decoded:', reqUrl)
    if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html'
    let filePath = path.join(root, reqUrl)
    console.log('Resolved filePath:', filePath)
    if (!filePath.startsWith(root)) {
      res.writeHead(403)
      res.end('Forbidden')
      return
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // SPA fallback to index.html
        const index = path.join(root, 'index.html')
        fs.stat(index, (ie, is) => {
          if (ie || !is.isFile()) {
            res.writeHead(404)
            res.end('Not found')
            return
          }
          sendFile(index, res)
        })
        return
      }
      // Support Range requests for efficient video streaming
      const range = req.headers.range
      const ext = path.extname(filePath).toLowerCase()
      const type = mime[ext] || 'application/octet-stream'

      if (range) {
        const total = stats.size
        const parts = /bytes=(\d*)-(\d*)/.exec(range)
        if (parts) {
          const start = parts[1] ? parseInt(parts[1], 10) : 0
          const end = parts[2] ? parseInt(parts[2], 10) : total - 1
          if (isNaN(start) || isNaN(end) || start > end || start >= total) {
            res.writeHead(416, { 'Content-Range': `bytes */${total}` })
            res.end()
            return
          }

          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': type,
          })

          const stream = fs.createReadStream(filePath, { start, end })
          stream.on('error', () => {
            res.writeHead(500)
            res.end('Server error')
          })
          stream.pipe(res)
          return
        }
      }

      // No Range header - serve the full file
      res.setHeader('Content-Type', type)
      res.setHeader('Accept-Ranges', 'bytes')
      const stream = fs.createReadStream(filePath)
      stream.on('error', () => {
        res.writeHead(500)
        res.end('Server error')
      })
      stream.pipe(res)
    })
  } catch (e) {
    res.writeHead(500)
    res.end('Server error')
  }
})

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`)
})

// graceful shutdown
process.on('SIGINT', () => {
  server.close(() => process.exit(0))
})
