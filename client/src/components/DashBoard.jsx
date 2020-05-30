import React, {Component} from 'react';
import './css/DashBoard.css';
import axios from 'axios';


// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state ={
            GPU_status : false ,
            epoch : 1,
            loss : 0.0
            
        }
        this.updateTrainStat.bind(this);
        
    }
    isGPUavailable(){
        axios.get('http://localhost:5000/api/gpu_status').then(
            response=>{
                if(response.data == true){
                    this.setState({GPU_status:true})
                    console.log(`GPU Status is ${this.state.GPU_status}`)
                }
                else if(response.data == false){
                    this.setState({GPU_status:false})
                    console.log(`GPU Status is ${this.state.GPU_status}`)
                }
                else{
                    console.log(`GPU Status is ${response.data}`)
                }
            }  
        ).catch(
            function(error){
                console.log(error);
            }
        )
    }

    updateTrainStat = () =>{
        let newEpoch = [...this.state.epoch]
        axios.get('http://localhost:5000/api/callback/train_stat').then(
            response => {            
                newEpoch[item] = response.data.epoch    
                this.setState({
                    epoch : newEpoch
                    loss : response.data.loss
                })
            }          
        ).catch(
            function(error){
                console.log(error)
            }
        )
    }
    componentDidMount(){
        this.isGPUavailable()  
        //setInterval(this.updateTrainStat,1000)
        //clearInterval(this.state.IsTraining,500)
    }
    componentDidUpdate(){
        let training_status = this.props.training_status 
        if(training_status == true){
            console.log(`training_status is ${training_status}`)
            setInterval(this.updateTrainStat,5000)
        }
        else{
            console.log(`training_status is ${training_status}`)
        }
    }

    render(){
        return(
            <div className="DashBoardContainer"> 
                <div className = "paramsGrid">
                    <div className ="modelName">Model Name</div>
                    <div className = "train_scalable_learning_rate">learning_rate</div>
                    <div className = "train_epochs">
                    <div id="epochs_names">Epochs</div>
                    <div id="current_epochs">
                        {this.state.epoch[this.state.epoch.length-1]}/ {this.props.TotalEpochs}</div>
                    </div> 
                </div>
                <div className = "train_loss">
                    <div>
                    </div>
                </div>
                <div className="GPUStatus">
                    <div className="GPUIndicatior">GPU Status</div>
                    <div id={this.state.GPU_status ? 'gpu_available_dot' : 'gpu_unavailable_dot'} />
                    
                </div>
            </div>
        )
    }
}