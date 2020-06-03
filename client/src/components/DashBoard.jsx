import React, {Component} from 'react';
import '../css/DashBoard.css';
import axios from 'axios';
import Chart from './Chart/lossChart';
import EpochComponent from './DashBoard/Epoch';
import StatusComponent from './DashBoard/Status';
import Evaluate from './DashBoard/Eval';
// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state ={
            GPU_status : false ,
            iscallbacksRun : false,
            trainStat : [],
            lastEpoch : 0,
            dummydata : [
                {
                    'epoch' : 1,
                    'loss' : 12.54,
                    'accuracy' : 0.88
                },
                {
                    'epoch' : 2,
                    'loss' : 0.35,
                    'accuracy' : 0.94
                },
                {
                    'epoch' : 3,
                    'loss' : 11.0,
                    'accuracy' : 0.99
                }
            ]
        }
        this.updateTrainStat.bind(this);
        
    }
    isGPUavailable(){
        axios.get('http://localhost:5000/api/gpu_status').then(
            response=>{
                if(response.data == 'True'){
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
    updateTrainStat= () =>{
            axios.get('http://localhost:5000/api/callback/train_stat').then(
            response=>{
                if (this.state.epoch.length == 0){
                    let posttrainStat = this.state.trainStat
                    this.setState({
                        trainStat : posttrainStat.concat({
                            epoch : response.data.epoch,
                            loss : response.data.loss,
                            accuracy : response.data.accuracy
                        }),
                        lastEpoch : response.data.epoch
                    })
                    console.log(this.state.trainStat)
                
                }
                else if(this.state.trainStat[this.state.trainStat.length-1].epoch != response.data.epoch){
                    let posttrainStat = this.state.trainStat;
                    this.setState({
                        trainStat : posttrainStat.concat({
                            epoch : response.data.epoch,
                            loss : response.data.loss,
                            accuracy : response.data.accuracy
                        })
                    })
                    console.log(this.state.trainStat)
                }
                else{
                    console.log('Epochs is Not Changed')
                    console.log(this.state.trainStat)
                }

            }) // Axios End Scope
          
    }

    
    componentDidMount(){
        this.isGPUavailable() 
    }

    componentDidUpdate(prevProps){
        if(this.props.training_status == true && this.state.iscallbacksRun == false){
            this.setState({
                iscallbacksRun : true
            })
            setInterval(this.updateTrainStat,3000)
        }
        else{
            console.log(`Training Status is ${this.props.training_status}`)
        }
    }


    render(){
        return(
            <div className="DashBoardContainer"> 
            <div className="flexBoxColunm">
                <div className="lossChart">
                    <span className="lossChart inboxWord">Loss</span>
                    <Chart dataset={this.state.dummydata} epochLength ={this.props.TotalEpochs}/>
                </div>
                <div className="EvaluateBox">
                    <Evaluate></Evaluate>
                </div>
            </div>
            
            <div className="flexBoxColumn">
                <div className="StatusBox GPUStatus">
                    <StatusComponent word={"GPU Status"} status={this.state.GPU_status}/>
                </div>
                <div className="StatusBox TrainingStatus">
                    <StatusComponent word={"Training Status"} status={this.props.training_status}/>
                </div>
                <div className="EpochBox">
                    <EpochComponent CurrEpoch={this.state.lastEpoch} TotalEpochs={this.props.TotalEpochs}></EpochComponent>
                </div>
            </div>
            </div>
        )
    }
}