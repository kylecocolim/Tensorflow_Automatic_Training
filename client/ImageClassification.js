import React from 'react';
import ModelBuilder from './DemoComponent/Model.jsx';
import DashBoard from './DemoComponent/DashBoardContainer.jsx';
import './DashBoardStyle/DashBoardStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

function DashBoardDemo(){
    return(
        <div className="DashBoardDemo">
            <ModelBuilder/>
            <DashBoard/>
        </div>
    )
}

export default DashBoardDemo;