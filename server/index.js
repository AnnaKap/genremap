const express = require('express')
const next = require('next')
const session = require('express-session')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const axios = require('axios')

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
  server.get('/map/:playlistId', (req, res)=> {
    try{
      return app.render(req, res, '/map', { playlistId: req.params.playlistId})
    }
            
            // const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
            // let genres = {}
            // console.log(tracks.data)
            // tracks.data.forEach(track => {
            //    const songName =  track.name
            //    console.log(songName)
            // });
            // return app.render(req, res, '/map', { slug: req.params.playlistId, tracks: tracks.data})
        // }
    catch(error){
      console.error(err)
    }
  })
    
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