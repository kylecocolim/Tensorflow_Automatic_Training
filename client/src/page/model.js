import React from 'react';
import ModelBuilder from '../components/Model';
import DashBoard from '../components/DashBoard';
class famousModel extends React.Component{
    
    render(){
        return(
        <div>
            <ModelBuilder/>
            <DashBoard/>
        </div>
    )
    }
}

export default famousModel;