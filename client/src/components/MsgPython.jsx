import React , {Component} from 'react';
import io from 'socket.io-client';


// Parents : Model.jsx
export default class Message extends Component{
    constructor(props){
        super(props)
        this.setState = {
            msg : String()
        }
    }
    componentDidMount(){
        const socket = io('http://localhost:3000')
        socket.emit('msg')
    }
    

    render(){
        return(
            <div className="msgForm">
            
            </div>
        )
    }
}