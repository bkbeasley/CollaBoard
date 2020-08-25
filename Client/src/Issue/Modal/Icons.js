import React, { Component } from 'react';
import styled from 'styled-components';

import PriorityHighIcon from '@atlaskit/icon-priority/glyph/priority-high';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';

import StoryIcon from '@atlaskit/icon-object/glyph/story/16';
import BugIcon from '@atlaskit/icon-object/glyph/bug/16';
import TaskIcon from '@atlaskit/icon-object/glyph/task/16';

const Container = styled.div`
    display: inline-block;
`


export default class Icons extends Component {

    render(){
        return(
            <Container>
                {this.props.name === 'High' && ( 
                    <PriorityHighIcon />
                )}
                {this.props.name === 'Medium' && (
                    <PriorityMediumIcon />
                )}
                {this.props.name === 'Low' && (
                    <PriorityLowIcon />
                )}
                {this.props.name === 'Story' && (
                    <StoryIcon />
                )}
                {this.props.name === 'Task' && (
                    <TaskIcon />
                )}
                {this.props.name === 'Bug' && (
                    <BugIcon />
                )}
            </Container>
        );
    }
}