import React, {Component} from 'react';
import axios from 'axios';
import Chart from './DashBoard/Chart/lossChart.jsx';
import ValChart from './DashBoard/Chart/val_Chart.jsx';
import EpochStatus from './DashBoard/Epoch.jsx';
import StatusComponent from './DashBoard/Status.jsx';
import LearningRateBox from './DashBoard/learningRate.jsx';
// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        // iscallbackRun : Prevent Loop Callback for componentdidupdate
        this.state ={
            GPU_status : true,
            isTraining : true,
            iscallbackRun : false,
            trainStat : [],
            TotalEpoch : 5,
            currentEpoch : 4,
            learningRate : 0.001,
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
    }
   
    
   

    render(){
        return(
            <div className="DashBoardContainer"> 
            <div className="flexBoxColunm">
                <div className="lossChartContainer">
                    <span className="lossChartContainer inboxWord">Train</span>
                    <Chart dataset={this.state.dummyData}/>
                </div>
                <div className="lossChartContainer">
                    <span className="lossChartContainer inboxWord">Validation</span>
                    <ValChart dataset={this.state.dummyData_val} target="val_loss"></ValChart>
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