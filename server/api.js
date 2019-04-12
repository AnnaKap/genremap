const express = require('express');
const Router = express.Router;
let request = require('request')
let querystring = require('querystring')
let api = Router();
const axios = require('axios')

api.get('/me', async (req, res)=> {
    try{
        if(req.session.accessToken){
            const {data} = await axios.get(`https://api.spotify.com/v1/me?access_token=${req.session.accessToken}`)
            res.send(data)
        }
        else{
            res.status(404)
        }
    }
    catch(err){
        console.error(err)
    }
})
api.post('/playlists', async(req, res)=>{
    try{
        if(req.session.accessToken){
            // console.log(req.body)
            const {userId} = req.body
            const {data} = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists?access_token=${req.session.accessToken}`)
            res.send(data)
        }
    }
    catch(err){
        console.error(err)
        res.send(error)
    }
})
api.get('/map/:playlistId',(req, res)=> {
    // try{
        if(req.session.accessToken){
            console.log(req.params)
            const {playlistId} = req.params
            axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
            .then(reponse =>{
                return app.render(req, res, '/map', { playlistId: req.params.playlistId, tracks: reponse.data})
            }
            )
            // const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
            // let genres = {}
            // console.log(tracks.data)
            // tracks.data.forEach(track => {
            //    const songName =  track.name
            //    console.log(songName)
            // });
            // return app.render(req, res, '/map', { slug: req.params.playlistId, tracks: tracks.data})
        // }
        }
    })
//     catch(err){
//         console.error(err)
//     }
// })
api.post('/tracks', async(req, res)=>{
    try{
        if(req.session.accessToken){
            const {playlistId} = req.body
            const tracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
            let genres = {}
            console.log(tracks.data)
            tracks.data.forEach(track => {
               const songName =  track.name
               console.log(songName)
            });
        }
    }
    catch(err){
        console.error(err)
    }
})
module.exports = api;