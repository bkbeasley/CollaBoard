import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from '@atlaskit/button';
import axios from 'axios';
import TopNav from './TopNav';
import TopAppBar from './TopAppBar';

import { useHistory } from "react-router-dom";


import styled from 'styled-components';

import HomeImage from './assets/images/scrum-board.svg';

const Row = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: ${(props) => props.size};
  padding-top: 3em;
`

const Heading = styled.h1`
  color: #091E42;
  padding-top: 3em;
`

const LinkButton = styled.div`
  padding-top: 2em;
`

function Home(props) {

  const history = useHistory();

        return (
            <div className="App">
              <TopAppBar />
              <Row>
                <Column size={1} />
                <Column size={2}>
                  <Heading>
                    The #1 project management tool for agile teams
                  </Heading>
                  <LinkButton>
                    <Button appearance="primary" href="/register" >Try it free</Button>
                  </LinkButton>
                </Column>
                <Column size={6}>
                  <img src={HomeImage} width="640em" height="400em" />
                </Column>
              </Row>
              </div>
        );
    
}

export default Home