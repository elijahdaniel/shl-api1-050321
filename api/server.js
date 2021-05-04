// BUILD YOUR SERVER HERE
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

const userRouter = require('./users/router')

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/users', userRouter)

server.get('/', (req, res) =>
  res.status(200).json({ message: `Server is up.` })
)

module.exports = server // EXPORT YOUR SERVER instead of {}
