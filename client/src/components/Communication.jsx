import React, {Component} from 'react';
import './css/communication.css';


// Communication Componnet with Flask for Moniotr Training Process 
export default class Communication extends Component{
    constructor(props){
        super(props)
        this.state = {
            curr : String()
        }
    }
    render(){
        return(
            <div className="CommunicationContainer">
                1
            </div>
        )
    }
}