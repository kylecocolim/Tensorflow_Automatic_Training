import React , {Component} from 'react';
import { AreaChart, Area,CartesianGrid, linearGradient,Legend, XAxis, YAxis, Tooltip} from 'recharts'
import DataSelector from './dataSelector';


export default class ValChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataType : 'val_loss'
        }
        this.dataChanger.bind(this)
    }  

    dataChanger = (data) =>{
        if(data==='loss'){
            this.setState({
                dataType : 'val_loss'
            })
        }
        else{
            this.setState({
                dataType : 'val_acc'
            })
        }

    }
   

    render(){
        let style ={
            position : 'relative',
            top : 30
        }
        return( 
            <div style={style}>
                <DataSelector dataChanger={this.dataChanger} selectedStroke="#09ab72" name="validation_dataType"></DataSelector>
                <div className="Chart">
                <AreaChart width={550} height={250} data={this.props.dataset}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="validation_gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#09ab72" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#09ab72" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="epoch"/>
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey={this.state.dataType} stroke="#09ab72" fillOpacity={1} fill="url(#validation_gradient)" />
                        </AreaChart>
                </div>
            </div>
        )
    }
}