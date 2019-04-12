import {Component} from 'react'
import axios from 'axios'
export default class map extends Component {
    constructor(){
        super()
        this.state = {
            playlistId:""
        }
    }
   static async getInitialProps({ query }){
       console.log('playlistId', await query.playlistId)
       return {query}
   }
   componentDidMount(){
    this.setState({
        playlistId : query.playlistId
    })
}
   render(){
       return <h1>Map</h1>
   }
}
