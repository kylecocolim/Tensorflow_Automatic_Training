import React, {Component} from 'react';
import './css/DashBoard.css';
import axios from 'axios';
import lossChart from './lossChart/Chart';



// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state ={
            GPU_status : false ,
            epochs : 0,
            curr_losses : 0.0,
            curr_batch : 0,
        }

        this.updateTrainStat.bind(this);
        
    }
    isGPUavailable(){
        axios.get('http://localhost:5000/api/gpu_status').then(
            response=>{
                if(response.data == true){
                    this.setState({GPU_status:true})
                    console.log(this.state.GPU_status)
                }
                else{
                    this.setState({GPU_status:false})
                    console.log(this.state.GPU_status)
                }
            }  
        ).catch(
            function(error){
                console.log(error);
            }
        )
    }
    updateTrainStat(){
        axios.get('http://localhost:5000/api/callback/training_status').then(
            response=>{
                this.setState({
                    epochs : response.data.epochs,
                    curr_losses : response.data.curr_loss,
                    curr_batch : response.data.curr_batch})
                    console.log(response.data)
            }
        )
    }
    componentDidMount(){
        this.isGPUavailable()  

    }

    render(){
        return(
            <div className="DashBoardContainer"> 
            {this.updateTrainStat()}  
                <div className = "paramsGrid">
                    <div className ="modelName">Model Name</div>
                    <div className = "train_scalable_learning_rate">learning_rate</div>
                    <div className = "train_epochs">
                        <div>Epochs</div> 
                    <div>{this.state.epochs}</div>
                    </div> 
                </div>
                <div className = "train_loss">
                    <div>
                        <lossChart></lossChart>
                    </div>
                </div>
                <div className="GPUStatus">
                    <div className="GPUIndicatior">GPU Status</div> 
                </div>
            </div>
        )
    }
}