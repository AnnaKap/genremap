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
    }
})
module.exports = api;