import React, {Component} from 'react';
import './css/DashBoard.css';
import axios from 'axios';
import {Tabs,Tab} from 'react-bootstrap';


// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state ={
            GPU_status : false 
        }
        
    }
    isGPUavailable(){
        axios.get('http://localhost:5000/api/gpu_status').then(
            response=>{
                if(response.data == 'True'){
                    this.setState({GPU_status:true})
                }
                else{
                    this.setState({GPU_status:false})
                }
            }  
        ).catch(
            function(error){
                console.log(error);
            }
        )
    }
    componentDidMount(){
        this.isGPUavailable()
    }
  
    render(){
        return(
            <div className="DashBoardContainer">             
                <div className="DashBoardIndicator">
                    <div id="inform">DashBoard</div>
                </div>
                <div className="GPUStatus">
                <span>GPU</span> <div id={this.isGPUavailable ? 'gpu_available_dot' : 'gpu_unavailable_dot'} />
                </div>
            </div>
        )
    }
}