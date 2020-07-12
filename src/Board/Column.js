import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import styled from 'styled-components';

const Container = styled.div`
    margin: 8px;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
    width: 220px;
    min-height: 500px;
    display: flex;
    background-color: #f4f5f7;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    
`


const Title = styled.h3`
    padding: 8px;
    color: #7A869A;
    font-size: 17px;
    font-weight: 700;
    text-align: left;
`

const CardList = styled.div`
    paddding: 8px;
    flex-grow: 1;
    min-height: 100px;
    background-color: ${props => (props.isDraggingOver ? '#B3F5FF' : '#f4f5f7')};
`


export default class Column extends Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.columnId}>
                    {(provided, snapshot) => (
                    <CardList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver} >
                        {this.props.issues.map((issue, index) => (
                            <Card key={issue.issueId} issue={issue} index={index} deleteIssue={this.props.deleteIssue} members={this.props.members} currentUser={this.props.currentUser} />
                        ))}
                        {provided.placeholder}
                    </CardList>
                    )}
                </Droppable>
            </Container>
        )}
}
