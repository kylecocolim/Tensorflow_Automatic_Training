import React, {Component} from 'react';
import './css/DashBoard.css';
import {Tabs,Tab} from 'react-bootstrap'
import Message from './MsgPython';

// Communication Componnet with Flask for Moniotr Training Process 
export default class DashBoard extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="DashBoardContainer">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="PythonBash" title="PythonBash">
                   <Message/> 
                </Tab>
                <Tab eventKey="DashBoard" title="DashBoard">
                    My
                </Tab>

                </Tabs>
            </div>
        )
    }
}