import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';

export default class NavBar extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Famous Model</Nav.Link>
                        <Nav.Link href="/Custom_Model">Custom Model</Nav.Link>
                        <Nav.Link href="/dataset">Dataset</Nav.Link>
                    </Nav>
            </Navbar>
        )
    }
}