const express = require('express')
const next = require('next')
const session = require('express-session')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
  const server = express()
  //body parser
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }))
  // serssion middleware
  server.use(session({
    secret:'lala',
    resave: false,
    saveUninitialized: false
  }))
  server.use('/api', require('./api'))
  server.use('/auth', require('./auth'))
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})