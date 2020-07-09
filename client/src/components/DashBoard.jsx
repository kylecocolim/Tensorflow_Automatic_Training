import React, {Component} from 'react';
import '../css/DashBoard.css';
import axios from 'axios';
import Chart from './DashBoard/Chart/lossChart';
import EpochComponent from './DashBoard/Epoch';
import StatusComponent from './DashBoard/Status';
import Evaluate from './DashBoard/Eval';
// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        // iscallbackRun : Prevent Loop Callback for componentdidupdate
        this.state ={
            GPU_status : false,
            isTraining : false,
            iscallbackRun : false,
            trainStat : [],
            TotalEpoch : 0,
            currentEpoch : 0,
            trainfinishStatus : true
        }
        this.updateTrainStat.bind(this);
    }
   
    isGPUavailable(){
        axios.get('http://localhost:5000/api/status/gpustatus').then(
            response=>{
                if(response.data == true){
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
    isTraining(){    
        axios.get('http://127.0.0.1:5000/api/status/iscurrentTraining')
        .then(res=>{
            if(res.data == true){
                this.setState({
                    isTraining:true
                })
            }
            else if(res.data == false){
                this.setState({
                    isTraining : false
                })
            }
            else{
                console.log(res.data)
            }
        }).catch(
            error=>{
                console.log(error)
            }
        )
    }
    updateTrainStat = () =>{
        axios.get('http://localhost:5000/api/inference/callback/train_stat').then(
            response =>{
                    let emptyArray = []
                    this.setState({
                        TotalEpoch : response.data.TotalEpoch,
                        currentEpoch : response.data.currentEpoch,
                        trainStat : emptyArray.concat(response.data.trainStat),
                        trainfinishStatus : response.data.trainfinishStatus
                })
               
            }
        )
               
    }
    
    componentDidMount(){
        this.isGPUavailable() 
        this.loadTrainingState = setInterval(()=>{
            this.isTraining()},3000)
        this.updateTrainStat()
    }

    componentDidUpdate(prevProps){
        if(this.state.isTraining==true && this.state.iscallbackRun==false){
            this.updateTrainStats = setInterval(()=>{
                this.updateTrainStat()
            },5000)
            this.setState({
                iscallbackRun : true
            })
        }
        if (this.state.isTraining==true){
            clearInterval(this.loadTrainingState)
        }
        if((this.state.TotalEpoch < this.state.currentEpoch) && (this.state.trainfinishStatus == true)){
            this.setState({
                currentEpoch : this.state.TotalEpoch
            })
            clearInterval(this.updateTrainStats)
        }
    }


    render(){
        return(
            <div className="DashBoardContainer"> 
            <div className="flexBoxColunm">
                <div className="lossChart">
                    <span className="lossChart inboxWord">Train Loss</span>
                    <Chart dataset={this.state.trainStat} epochLength ={this.state.TotalEpochs}/>
                </div>
           
            </div>
            
            <div className="flexBoxColunm status">
                <div className="StatusBox GPUStatus">
                    <StatusComponent word={"GPU Status"} status={this.state.GPU_status}/>
                </div>
                <div className="StatusBox TrainingStatus">
                    <StatusComponent word={"Training Status"} status={this.state.isTraining}/>
                </div>
                <div className="EpochBox">
                    <EpochComponent CurrEpoch={this.state.currentEpoch} TotalEpochs={this.state.TotalEpoch}></EpochComponent>
                </div>
            </div>
            </div>
        )
    }
}