const http = require('http')
const app = require('./app')

// define port 
const port = process.env.PORT || 5000

// create Srever
const server = http.createServer(app)

server.listen(port)