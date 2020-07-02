import React , {Component} from 'react';
import { AreaChart, Area,CartesianGrid, LabelList,linearGradient,Legend, XAxis, YAxis, Tooltip} from 'recharts'
import DataSelector from './dataSelector';

export default class Chart extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataType : 'loss'
        }
    }
  
    dataChanger = (data) =>{
        this.setState({
            dataType : data
        })
        console.log(data)
    }

    render(){
        let style ={
            position : 'relative',
            top : 30
        }
        
        return( 
            <div style={style}>
                <DataSelector dataChanger={this.dataChanger} selectedStroke="#8884d8" name="Train_dataType"></DataSelector>
                <div className="Chart">
                    <AreaChart width={550} height={250} data={this.props.dataset}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="epoch"/>
                        <YAxis />
                        <Tooltip formatter={(okay) => new Intl.NumberFormat('en').format(okay)} />
                        <Area type="monotone" dataKey={this.state.dataType} stroke="#8884d8" fillOpacity={1} fill="url(#colorLoss)" />
                    </AreaChart>
                </div>
            </div>
        )
    }
}