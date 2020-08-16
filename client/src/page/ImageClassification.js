import React from 'react';
import ModelBuilder from '../components/Model';
import DashBoard from '../components/DashBoardContainer'
const ImageClassification =() => {
    let style ={
        display : 'flex',
        position : 'relative',
        top : 30
    }
    return(
        <div style ={style}> 
            <ModelBuilder/>
            <DashBoard/>

        </div>
    )
    
}

export default ImageClassification;