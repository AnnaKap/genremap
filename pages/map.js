import {Component} from 'react'
import axios from 'axios'

export default class map extends Component {
    constructor(props){
        super(props)
        this.state = {
            playlistId:"" 
        }
    }
   static async getInitialProps({ query }){
       console.log('playlistId', query) 
       console.log(this.props)
       return {query}
   }
   async componentDidMount(){
      const tracks = await axios.post('/api/tracks', {playlistId: this.props.query.playlistId})
      console.log(tracks.data)
   }
   render(){
       
       return <h1>{this.props.query.playlistId}</h1>
   }
}
