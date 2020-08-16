import React, {Component} from 'react';
import Canvas from './EvalCanvas/Canvas.jsx';
import axios from 'axios';
export default class Evaluate extends Component{
    constructor(props){
        super(props)
        this.state={
            savedModelStatus : false
        }
        this.SavedModelExist.bind(this)
    }
    SavedModelExist = () =>{
        axios.get('http://localhost:5000/api/status/issavedmodelexist').then(
            response=>{
                if(response.data == false){
                    this.setState({
                        savedModelStatus : false
                    })
                }
                else if(response.data == true){
                    this.setState({
                        savedModelStatus : true
                    })
                }
                else{
                    console.log('Type Error')
                }
            }).catch(
                error=>{
                    console.log('error')
                }
            )
    }
   
    componentDidMount(){
        this.SavedModelExist()
    }
    render(){
        let NoExistStyle = {
            width : 550,
            height : 360, 
            backgroundColor : '#1f2940',
            fontColor : 'white',
            fontSize : 20,
            fontWeight : 'bold',
            textAlign : 'center',
            lineHeight : 17

        }
        let eval_style = {
            position : 'relative',
            top : 0,
            width : 550,
            height : 40,
            color : 'white',
            fontSize : 20,
            backgroundColor : '#1f2940',
            borderBottom : '1px solid white'
        }
        return(
            <div className="evaluateContainer">
            <div className='evaluate_indicator' style={eval_style}>Evaluate Model</div>
            {this.state.savedModelStatus  ? 
            <Canvas/>: 
            <div style={NoExistStyle}>
                Not Finished Trained And No Exist Saved Model
            </div>
            }
            </div>
        )
    }
}