import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';


const Text = styled.h3`
    font-size: 14px;
    font-weight: 700;
`


export default class Reporter extends Component {

    constructor(props) {
        super(props);
    

        this.state = {
            
        }
    }

    render() {

        return (
            <div>
            <Button iconBefore={<Avatar src={this.props.avatar} size="small" />} isDisabled >{this.props.username}</Button>
            </div>
        );
    }
}