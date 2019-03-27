import Header from '../components/header'
import { render } from 'preact';
import {Component} from 'react'
import axios from 'axios'
export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            userId:"",
            playlists:[]
        }
    }
    async componentDidMount(){
        try{
            // axios.get('/api/me').then(response =>{
            //     const {data} = response
            //     this.setState({
            //         user: data.display_name,
            //         userId: data.id
            //     })
            //     return this.state.userId
            // }).then(response => {
            //     return axios.post('api/playlists', {userId: response})
            // }).then(response =>{

            //     console.log(response.data)
            // })
      const {data} = await axios.get('/api/me')
      this.setState({
          user: data.display_name,
          userId: data.id
      })
      const response = await axios.post('api/playlists', {userId: this.state.userId})
      this.setState({
          playlists: response.data.items
      })
      console.log(this.state.playlists)
        }
        catch(err){
            console.log(err)
        }
    }
    render(){

        return (
            <div>
                <h1>home</h1>
                {
                 this.state.user.length > 1 ? <div> {this.state.user} </div> : <div> loading... </div>
                }
                {
                    this.state.playlists.length && this.state.playlists.map(playlist =>{
                        return (<div>
                            <h1>{playlist.name}</h1>
                            <p>{playlist.tracks.total}</p>
                        </div>)
                    })
                }
            </div>
        )
    }
}