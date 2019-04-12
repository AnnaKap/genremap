import Header from '../components/header'
import { render } from 'preact';
import Link from 'next/link'
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
                    this.state.playlists.length && this.state.playlists.map((playlist,idx) =>{
                        return (
                        <div key={idx}>
                            <Link href={`/map?playlistId=${playlist.id}`} as='/map'>
                                <h1 id={playlist.id}>{playlist.name}</h1>
                            </Link>
                            <p>{playlist.tracks.total}</p>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}