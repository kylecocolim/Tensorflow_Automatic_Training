import React ,{useState} from 'react';

function EpochStatus(props){

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
            <div style={WordStyle}>Epoch</div>
            <div style={style}>{props.currentEpoch} / {props.TotalEpoch}</div>
        </div>
    )
}

export default EpochStatus;