import React from 'react';
import Model from '../components/Model';
import DashBoard from '../components/DashBoard';
const famousModel = () =>{
    return(
        <div>
            <div id="welcome">Tensorflow Model Trainer</div>
            <Model/>
            <DashBoard/>
        </div>
    )
}

export default famousModel;