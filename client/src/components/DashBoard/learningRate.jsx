import React,{Component} from 'react';

export default class LearningRateBox extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let WordStyle ={
            fontSize : 20,
        }
        let style={
            paddingTop : 3,
            fontSize: 45,
            color : 'rgba(255,255,255,.8)'
        }
        return(
            <div>
                <div style={WordStyle}>Learning Rate</div>
                <div style={style}>{this.props.learningRate}</div>
            </div>
        )
    }
}