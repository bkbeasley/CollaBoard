import React, { Component } from 'react';
import styled from 'styled-components';
import Textfield from '@atlaskit/textfield';

const Container = styled.div`
    max-width: 450px;
    padding-left: 10px;

`

const Text = styled.h2`
    font-weight: 700;
    font-size: 14px;
`

export default class Summary extends Component {

    render() {
        return (
            <Container>
            <Text>Summary</Text>
            <Text>
            <Textfield  />
            </Text>
            </Container>
        );
    }

}