import React, {Component} from 'react';
import '../css/DashBoard.css';
import axios from 'axios';
import Chart from './DashBoard/Chart/lossChart';
import ValChart from './DashBoard/Chart/val_Chart';
import EpochStatus from './DashBoard/Epoch';
import StatusComponent from './DashBoard/Status';
import LearningRateBox from './DashBoard/learningRate';
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
            learningRate : 0,
            trainfinishStatus : true,
            dummyData : [
                {'epoch' : 1, 'loss' : 5.2,'accuracy' : 0.2},
                {'epoch' : 2, 'loss': 3.4,'accuracy' : 0.5},
                {'epoch' : 3 , 'loss' : 1.2,'accuracy' : 0.78},
                {'epoch' : 4 , 'loss' : 0.7 ,'accuracy' : 0.89}
            ],
            dummyData_val : [
                {'epoch' : 1, 'val_loss' : 5.1 ,'val_acc' : 0.3},
                {'epoch' : 2, 'val_loss' : 3.1 , 'val_acc' : 0.54},
                {'epoch' : 3, 'val_loss' : 2.1 , 'val_acc' : 0.68},
                {'epoch' : 4, 'val_loss' : 1.1 , 'val_acc' : 0.78}
            ]
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
                        trainfinishStatus : response.data.trainfinishStatus,
                        learningRate : response.data.learningRate
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
                <div className="lossChartContainer">
                    <span className="lossChartContainer inboxWord">Train</span>
                    <Chart dataset={this.state.dummyData}/>
                </div>
<<<<<<< HEAD
                <div className="lossChartContainer">
                    <span className="lossChartContainer inboxWord">Validation</span>
                    <ValChart dataset={this.state.dummyData_val} target="val_loss"></ValChart>
                </div>
=======
           
>>>>>>> eab5b7935b5f0a96fc31c93a8aa3b9b9dbc359c8
            </div>
            
            <div className="flexBoxColunm status">
                <div className="StatusBox GPUStatus">
                    <StatusComponent word={"GPU Status"} status={this.state.GPU_status}/>
                </div>
                <div className="StatusBox TrainingStatus">
                    <StatusComponent word={"Training Status"} status={this.state.isTraining}/>
                </div>
                <div className="EpochBox">
                    <EpochStatus currentEpoch={this.state.currentEpoch} TotalEpoch={this.state.TotalEpoch}></EpochStatus>
                </div>
                <div className="LearningRateBox">
                    <LearningRateBox learningRate={this.state.learningRate}></LearningRateBox>
                </div>
            </div>
            </div>
        )
    }
}