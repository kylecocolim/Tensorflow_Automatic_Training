import React,{Component} from 'react';
import axios from 'axios';
import './css/Model.css';
import {Form} from 'react-bootstrap';

export default class Model extends Component{
    constructor(props){
        super(props);
        this.state = {
            model : new String() ,
            inputShape : new String(),
            n_classes : new String(),
            include_top : new Boolean()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value});
        
    }
    getSelectValue(event){
        console.log(this.state.model);
        this.setState({ model : this.model.value});
    }
    setIncludeTop(event){
        this.setState({include_top : this.include_top.value})
    }
    /* 
    Send Params to Flask 
    Model : Keras Applications Model
    InputShape : Image InputShape
    N Classes : N_Classes
    Include Top : Using Origin NetWork
    */
    handleSubmit(event){
        event.preventDefault();
        const payload = {
            model: this.state.model,
            inputShape : this.state.inputShape,
            n_classes : this.state.n_classes,
            include_top : this.state.include_top   
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
                    <div className="inputForm">  
                    <form onSubmit={this.handleSubmit}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Model</Form.Label>
                            <Form.Control as="select" name="model" ref={model => this.model=model} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>VGG16</option>
                            <option>VGG19</option>
                            <option>Inception</option>
                            <option>ResNet</option>
                            <option>Inception</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        Input Shape  <input type='text' name='inputShape' onChange={this.handleChange}/><br/>
                        N_Classes <input type='text' name="n_Classes" onChange={this.handleChange}/>
                        <input type='submit' value='Start'/>
                    </form>
                    </div>
                </div>
                <div className="SwitchBox">
                <Form>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Check this switch"/>
                    </Form>
                </div>
            </div>
        )
    }
}