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
            include_top : new Boolean(),
            loss : new String(),
            Batch_size : new String(),
            Optimizer : new String(),
            Metrics : new String()
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
                <div id="welcome">Tensorflow Model Trainer</div>
                <div className="FormContainer">
                    <div className="ModelSelector">  
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
                        <span id="formexplain">Input Shape</span><div id="inputForm"><input type='text' name='inputShape' onChange={this.handleChange}/></div>
                        <span id="formexplain">N Classes </span><div id="inputForm"> <input type='text' name="n_Classes" onChange={this.handleChange}/> </div>
                        <span id="formexplain">Batch_size </span><div id="inputForm"> <input type='text' name="Batch_size" onChange={this.handleChange}/> </div>
                        <Form>
                        <Form.Group>
                            <Form.Label>Loss</Form.Label>
                            <Form.Control as="select" name="loss" ref={loss => this.loss=loss} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>Categorical Cross Entropy</option>
                            <option>Binary Cross Entropy</option>
                            <option>Mean Square Error</option>
                            <option>Mean Absolute Percentage Error</option>
                            <option>Hinge</option>
                            <option>categorical_hinge</option>
                            <option>logcosh</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        <Form>
                        <Form.Group>
                            <Form.Label>Optimizer</Form.Label>
                            <Form.Control as="select" name="Optimizer" ref={optimizer => this.optimizer=optimizer} onChange={this.getSelectValue.bind(this)}custom>
                            <option>default</option>
                            <option>Adam</option>
                            <option>SGD</option>
                            <option>RMSprop</option>
                            <option>Adagrad</option>
                            <option>AdeDelta</option>
                            <option>AdaMax</option>
                            <option>Nadam</option>
                            </Form.Control>
                        </Form.Group>
                        </Form>
                        <div className="SwitchBox">
                        <Form>
                            <Form.Check 
                                type="switch"
                                id="include_top"
                                label="Include Top"/>
                            </Form>
                        </div>
                        <input className="submitButton" type='submit' value='Start'/>

                    </form>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}