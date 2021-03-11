const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const io = require('socket.io')(http)
const restAPI = require('./my_modules/rest-api.js')
const socketAPI = require('./my_modules/socket-api.js')
const port = 8000

app.use(bodyParser.json())
app.use(restAPI)
app.use(express.static('www'))

io.on('connection', (socket) => socketAPI(socket, io))

http.listen(port, (err) => {
  if (err) return console.log(err)
  console.log(`
    listening on localhost:${port}
    document root is ${__dirname}
    ctrl c to quit
    `)

})
