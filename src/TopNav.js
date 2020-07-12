import React, { Component } from 'react';


import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Button from '@atlaskit/button';

import styled from 'styled-components';

const NavText = styled.p`
    color: #0052CC;
    font-weight: bold;
`

const DynamicButton = styled.div`
    
`

export default function TopNav() {

        return(
            <div>
                <NavBar sticky="top" bg="light" variant="light">
                    <Nav>
                        <Nav.Link href="#">
                            <NavText>Home</NavText>
                        </Nav.Link>
                        <Nav.Link href="#d">
                            <NavText>Features</NavText>
                        </Nav.Link>
                        <Nav.Link href="#a">
                            <NavText>About the Project</NavText>
                        </Nav.Link>
                        <DynamicButton>
                        <Button>Iii</Button>
                        </DynamicButton>
                    </Nav>
                </NavBar>
            </div>
        );
    
}

