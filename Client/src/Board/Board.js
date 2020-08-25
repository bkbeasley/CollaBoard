import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import styled from 'styled-components';
import axios from 'axios';

import CreateIssue from '../Issue/CreateIssue';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import TopAppBar from '../TopAppBar';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Api from '../api-config';


const Container = styled.div`
    display: flex;
` 

const Heading = styled.h2`
    color: #172B4D;
    text-align: left;
    padding-left: .2em;
`

const SubHeading = styled.p`
    font-size: 16px;
    color: #A5ADBA;
    font-weight: bold;
    font-style: italic;
    padding-right: 2em;
    margin-top: .3em;
`

const GridRow = styled.div`
    display: flex;
    padding-top: 2em;
`

const GridColumn = styled.div`
    flex: ${(props) => props.size};
`

const ButtonSpacing = styled.div`
    padding-top: 4em;
`

const ToolTipStyled = withStyles((theme) => ({
    arrow: {
        color: '#0065FF',
      },
    tooltip: {
      backgroundColor: "#0065FF",
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }))(Tooltip);


export default class Board extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        initialized: false,
        boardMember: null,
        data: this.props.data,
        members: null, 
    }

    updateBoardOnCreate = issue => {
        const newState = {
            ...this.state.data,
            issues: {
                ...this.state.data.issues,
                [issue.issueId]: {
                    columnId: issue.columnId,
                    position: issue.position,
                    summary: issue.summary,
                    description: issue.description,
                    priority: issue.priority,
                    type: issue.type,
                    index: issue.index,
                    issueId: issue.issueId,
                    reporter_username: issue.reporter_username,
                    reporter_avatar: issue.reporter_avatar,
                    assignee_username: issue.assignee_username,
                    assignee_avatar: issue.assignee_avatar,
                },
            }
        }

        //Update issueIds for the new Issue's Column
        const oldIssueIds = this.state.data.columns['column-' + issue.columnId].issueIds;
        
        //Moves the newly created Issue to the top of the Column
        oldIssueIds.unshift(issue.issueId);

        this.setState({data: newState});

        //Increment the positions of all the Issues in this column by one
        this.updateIssuePositions(oldIssueIds);

        let issuesInSameColumn = {};

        Object.keys(this.state.data.issues).forEach(key => {
            if (this.state.data.issues[key].columnId === issue.columnId) {
                issuesInSameColumn = {
                    ...issuesInSameColumn,
                    [key]: this.state.data.issues[key],
                }
            }
        });

        //Update the positions of all Issues in this Column
        this.sendIssuePutRequest(issuesInSameColumn, false);
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceColumn = this.state.data.columns[source.droppableId];
        const destinationColumn = this.state.data.columns[destination.droppableId];

        //Card movement within the same Column but to a different index
        if (sourceColumn === destinationColumn) {
            const newIssueIds = Array.from(sourceColumn.issueIds);

            newIssueIds.splice(source.index, 1);
            newIssueIds.splice(destination.index, 0, draggableId);

            //Update the position property for each Issue in this Column
            this.updateIssuePositions(newIssueIds);

            const newColumn = {
                ...sourceColumn,
                issueIds: newIssueIds,
            };

            const newState = {
                ...this.state.data,
                columns: {
                    ...this.state.data.columns,
                    [newColumn.columnId]: newColumn,
                },
            };

            this.setState(() => {
                return {data: newState};
            });

            let issuesInSameColumn = {};

            //Find and send only the Issues in the same Column
            Object.keys(this.state.data.issues).forEach(key => {
                let convertedId = "column-" + this.state.data.issues[key].columnId;
                
                if (convertedId === sourceColumn.columnId) {
                    issuesInSameColumn = {
                        ...issuesInSameColumn,
                        [key] : this.state.data.issues[key],
                    }
                }
            })

            this.sendIssuePutRequest(issuesInSameColumn, false);
            return;
        }

        //Moving from one Column to another
        const initialIssueIds = Array.from(sourceColumn.issueIds);
        initialIssueIds.splice(source.index, 1);

        //Update the position property for each Issue in the Source Column
        this.updateIssuePositions(initialIssueIds);

        const newSource = {
            ...sourceColumn,
            issueIds: initialIssueIds,
        };

        const finalIssueIds = Array.from(destinationColumn.issueIds);
        finalIssueIds.splice(destination.index, 0, draggableId);

        //Update the position property for each Issue in the Destination Column
        this.updateIssuePositions(finalIssueIds);

        const newDestination = {
            ...destinationColumn,
            issueIds: finalIssueIds,
        };

        const newState = {
            ...this.state.data,
            columns: {
                ...this.state.data.columns,
                [sourceColumn.columnId]: newSource,
                [destinationColumn.columnId]: newDestination,
            },
        };

        this.setState(() => {
            return {data: newState};
        });

        //Update the draggable's Column
        this.updateColumnPositions(draggableId, destinationColumn);

        //Send the updated Issues to the server
        this.sendIssuePutRequest(this.state.data.issues, true)
    }

    updateIssuePositions = issueIds => {
        let currentIssue;

        for (let i = 0; i < issueIds.length; i++) {
            currentIssue = this.state.data.issues[issueIds[i]];
            currentIssue.position = i;

            this.setState({
                ...this.state.data,
                issues: {
                    ...this.state.data.issues,
                    [currentIssue.issueId]: {
                        ...currentIssue,
                    }
                }
            });
        }
    }

    updateColumnPositions = (issueId, destinationColumn) => {
        let currentIssue = this.state.data.issues[issueId];
        currentIssue.columnId = destinationColumn.columnId.replace("column-","");

        this.setState({
            ...this.state.data,
            issues: {
                ...this.state.data.issues,
                [currentIssue.issueId]: {
                    ...currentIssue,
                }
            }
        })

    }

    //multipleColumns is a flag indicating whether or not multiple columns were 
    //involved in the Draggable's displacement
    sendIssuePutRequest = (issues, multipleColumns) => {
        if (!multipleColumns) {
            Object.keys(issues).forEach(key => {
                let issueId = parseInt(issues[key].issueId.replace("issue-",""));
                
                axios({
                    method: 'put',
                    url: Api.domain + 'issues/single-column',
                    data: {
                        issue_id: issueId,
                        position: issues[key].position,
                    }
                });
            });
            return;
        }

        Object.keys(issues).forEach(key => {
            let issueId = parseInt(issues[key].issueId.replace("issue-",""));

            axios({
                method: 'put',
                url: Api.domain + 'issues/multiple-columns',
                data: {
                    issue_id: issueId,
                    position: issues[key].position,
                    column_id: issues[key].columnId,
                }
            });
        });   
    }

    deleteIssue = issueKey => {
        let position;

        Object.keys(this.state.data.issues).forEach(issueId => {
            if (issueId === issueKey) {
                position = this.state.data.issues[issueId].position;

                Object.keys(this.state.data.columns).forEach(columnKey => {
                    if (columnKey === "column-" + this.state.data.issues[issueId].columnId) {
                        this.state.data.columns[columnKey].issueIds.splice(position, 1);
                        this.updateIssuePositions(this.state.data.columns[columnKey].issueIds);
                    }
                })
            }
        })

        let newIssuesArr = [];
        let newIssuesObj = {};

        Object.keys(this.state.data.issues).forEach(key => {
            if (key === issueKey) {

            }
            else {
                newIssuesArr.push(this.state.data.issues[key]);
            }
        })

        for (let i = 0; i < newIssuesArr.length; i++) {
            newIssuesObj[newIssuesArr[i].issueId] = newIssuesArr[i]; 
        }


        const newState = {
            ...this.state.data,
            issues: {
                ...newIssuesObj,
            }
        }

        axios({
            method: 'delete',
            url: Api.domain + 'issues/' + issueKey.replace("issue-",""),
            data: {
                
            }
        }).then(() => {
            this.setState({
                data: newState,
            })

            this.sendIssuePutRequest(this.state.data.issues, false);
        })
        
    }

    render = () => {
        return (
            <div>
                <TopAppBar />
                <GridRow>
                    <GridColumn>
                        <Heading>{this.props.boardName}</Heading>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <SubHeading>Team Members: </SubHeading>
                    </GridColumn>
                    <GridColumn>
                        <AvatarGroup max={4}>
                        {this.props.members != null && this.props.members.map(teamMember => {
                            return(
                                <ToolTipStyled title={teamMember.username} placement="top" arrow>
                                <Avatar style={{cursor: 'pointer'}} alt={teamMember.username} src={teamMember.avatar} />
                                </ToolTipStyled>
                            )
                        })}
                        </AvatarGroup>
                    </GridColumn>
                </GridRow>
                <Container>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.state.data.columnOrder.map(colId => {
                            const column = this.state.data.columns[colId];
                            const issues = column.issueIds.map(issId => this.state.data.issues[issId]);

                            return <Column key={column.columnId} column={column} issues={issues} deleteIssue={this.deleteIssue} members={this.props.members} currentUser={this.props.currentUser} />
                        })}        
                    </DragDropContext>
                </Container>
                <ButtonSpacing>
                    <CreateIssue updateBoard={this.updateBoardOnCreate} issues={this.state.data.issues} boardId={this.state.data.boardId} columns={this.state.data.columns} members={this.props.members} currentUser={this.props.currentUser} />
                </ButtonSpacing>
            </div>
        );
    }

}