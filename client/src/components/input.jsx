import React,{Component} from 'react';
import axios from 'axios';
import './css/input.css';


export default class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            model : new String() ,
            inputShape : new String()   
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});

         }
    handleSubmit(event){
        event.preventDefault();
        const payload = {
            model: this.state.model,
            inputShape : this.state.inputShape
        };
        axios.post(`http://127.0.0.1:3000/api`, {payload})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        }); 
    }
    render(){
        return(
            <div>
                <div id="welcome">테스트!</div>
                <div className="FormContainer">
                <form onSubmit={this.handleSubmit}>
                    모델 : <input type='text' name='model' onChange={this.handleChange}/><br/>
                    입력값 : <input type='text' name='inputShape' onChange={this.handleChange}/><br/>
                    <input type='submit' value='Submit'/>
                </form>
                </div>
            </div>
        )
    }
}