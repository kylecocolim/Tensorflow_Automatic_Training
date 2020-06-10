import React , {Component} from 'react';
import axios from 'axios';
export default class Canvas extends Component{
    constructor(props){
        super(props)
    }
    handleClick(){
        axios.get('http://localhost:5000/api/inference/evaluate').then(
            res=>{
                console.log('res.data')
                alert(`${res.data}`)
            }
        )
    }
    render(){
        return(
            <div>
                <button onClick={this.handleClick}>Hi</button>
            </div>
        )
    }
}