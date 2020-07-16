import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import EditIssue from '../Issue/EditIssue';

const Container = styled.div`
    border: ${props => (props.isDragging ? '1.5px solid #000000' : '1px solid #FFFFFF')};
    border-radius: 2px;
    padding: 18px;
    margin-bottom: 4px;
    margin-left: 4px;
    margin-right: 4px;
    background-color: ${props => (props.isDragging ? '#0052CC' : '#FFFFFF')};
    color: ${props => (props.isDragging ? 'white' : '#42526E')};
    font-weight: 500;
    :hover {
        background-color: #0052CC;
        color: white;
        opacity: 1.0;
        cursor: pointer;
        border: 1.5px solid #000000;
    }
`

export default class Card extends Component {

    state = {
        clicked: false,
    }

    open = () => {
        this.setState({clicked: true});
    }

    close = () => {
        this.setState({clicked: false});
    }

    render() {
        return (
            <div>
                {this.state.clicked && (
                    <EditIssue isOpen={true} closeModal={this.close} issue={this.props.issue} deleteIssue={this.props.deleteIssue} members={this.props.members} currentUser={this.props.currentUser} />
                )}
                <Draggable draggableId={this.props.issue.issueId} index={this.props.index}>
                    {(provided, snapshot) => (
                        <Container onClick={this.open}
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            {this.props.issue.summary}
                        </Container>
                    )}
                </Draggable>
            </div>
        );
    }
}