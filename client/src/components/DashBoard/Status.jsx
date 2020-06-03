import React , {Component} from 'react';

export default class StatusComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let enAble_Status_Style ={
            position : 'relative',
            width : 150,
            height : 40,
            backgroundColor : 'greenyellow',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius : 5
        }
        let disAble_Status_Style ={
            position : 'relative',
            width : 150,
            height : 40,
            backgroundColor : '#eb4d55',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius : 5
        }
        let wordingStyle={
            fontSize:16,
        }
        return(
            <div>
                <span className="GPUStatus InboxWord" style={wordingStyle}>{this.props.word}</span> 
                <div id="GPUStatus_Round"style={this.props.Status ? enAble_Status_Style : disAble_Status_Style} />
            
            </div>
                
        )
    }
}