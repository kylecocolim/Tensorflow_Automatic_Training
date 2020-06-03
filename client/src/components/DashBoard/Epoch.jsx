import React ,{Component} from 'react';

export default class EpochComponent extends Component{
    constructor(props){
        super(props)

    }
    render(){
        let WordStyle ={
            fontSize : 22,
            borderBottom : '1px solid white'
        }
        let style={
            fontSize: 50
        }
        return(
            <div>
                <div style={WordStyle}>Epochs</div>
                <div style={style}>{this.props.CurrEpoch} / {this.props.TotalEpochs}</div>
            </div>
        )
    }
}