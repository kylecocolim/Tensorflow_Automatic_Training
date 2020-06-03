import React , {Component} from 'react';
import { LineChart, CartesianGrid, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'


export default class Chart extends Component{
    constructor(props){
        super(props)
    }
  


    render(){
        let style ={
            position : 'relative',
            top : 30
        }
        return(
            <div style={style}>
                <ResponsiveContainer width={500} height={300}>
                    <LineChart data={this.props.dataset} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
                        <XAxis datakey="epoch"/>
                        <YAxis type="number" tick={{fontSize:'11px',padding:'5px'}}/>
                        <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                        <Tooltip></Tooltip>
                        <Legend></Legend>
                        <Line type="monotone" dataKey="loss" strokeOpacity="10" ></Line>

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}