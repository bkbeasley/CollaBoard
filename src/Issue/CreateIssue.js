import React, { Component } from 'react';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';
import axios from 'axios';
import styled from 'styled-components';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';

import Description from '../Issue/Modal/Description';
import Assignee from './Modal/Assignee';
import Reporter from './Modal/Reporter';
import Priority from './Modal/Priority';
import Dropdown from './Modal/Dropdown';
import TypeDropDown from './Modal/Dropdown/TypeDropDown';
import TestPriority from './Modal/TestPriority';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
    display: inline-block;
    width: 95%;
    padding-left: .5em;
    padding-right: .5em;
`

const Left = styled.div`
    float:left;
    padding-top: 1.2em;
`

const Right = styled.div`
    float:right;
    padding-left: 3em;
    padding-top: 1.5em;
`

const ModalTop = styled.div`
    padding-bottom: 20px;
    float: right;
`

const Heading = styled.h4`
    color: rgba(9, 30, 66, 0.77);
    padding-top: .7em;
    padding-bottom: 1.2em;
`

const SubHeading = styled.p`
    color: rgba(9, 30, 66, 0.60);
    font-weight: bold;
    margin-bottom: 0em;
    font-size: 14px;
`

const BottomPadding = styled.div`
    padding-bottom: 1em;
`

const styles = {
    purpleBorder: {
      border: '1px solid purple',
    },
    whiteBg: {
      backgroundColor: 'white !important',
    },
}

let issueTypeValue = '';
let descriptionContent = '';
let priorityValue = '';
let assignee_username = '';
let assignee_avatar = '';

export default class CreateIssue extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isOpen: false,
        error: '',
    }

    open = () => {
        this.setState({
            isOpen: true,
        });
    }

    close = () => {
        this.setState({
            isOpen:false,
        })
    }

    setIssueType = (val) => {
        issueTypeValue = val;
    }

    handleChangeValue = (val) => {
        descriptionContent = val;
    }

    setPriority = (val) => {
        priorityValue = val;
    }

    setAssignee = (val) => {
        assignee_username = val.username;
        assignee_avatar = val.avatar;
    }

    onFormSubmit = (data) => {
        //console.log(JSON.stringify(data));
        //console.log(data['summary']);
        //console.log("input:", data.summary);

        this.sendPostRequest(data.summary);
    }

    sendPostRequest = (data) => {
        if (issueTypeValue === '') {
            this.setState({error: 'NO_ISSUE_TYPE'});
            return;
        }
        else if (priorityValue === '') {
            this.setState({error: 'NO_PRIORITY'});
            return
        }

        //Testing: Find the column in position 0
        let columnId;
        for (let column in this.props.columns) {
            if (this.props.columns[column].position === 0) {
                columnId = this.props.columns[column].columnId.replace("column-","");
                columnId = parseInt(columnId);
            }
        }
        
        const obj = {
            position: 0,
            columnId: columnId,
            summary: data,
            description: descriptionContent,
            priority: priorityValue,
            type: issueTypeValue,
            reporter_username: this.props.currentUser.username,
            reporter_avatar: this.props.currentUser.avatar,
            assignee_username: assignee_username,
            assignee_avatar: assignee_avatar,
        }

        console.log("HERE's the object: ", obj.priority);

        //Get the current Board's current issue_index
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/boards/index/',
            data: {
                boardId: this.props.boardId,
            }
        }).then(result => {
            obj.index = result.data.toString();

            //Create the Issue on the backend
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/issues/',
                data: {
                    column_id: columnId,
                    position: 0,
                    summary: obj.summary,
                    type: obj.type,
                    description: obj.description,
                    priority: obj.priority,
                    assignee_id: 2,
                    reporter_id: 2,
                    issueIndex: obj.index,
                    reporter_username: this.props.currentUser.username,
                    reporter_avatar: this.props.currentUser.avatar,
                    assignee_username: assignee_username,
                    assignee_avatar: assignee_avatar,
                }
            }).then(result => {
                let id = result.data.issue_id;

                //Increment the Board's current issue_index
                axios({
                    method: 'put',
                    url: 'http://localhost:8080/api/boards/index/update/',
                    data: {
                        boardId: this.props.boardId,
                    }
                }).then(result => {
                    obj.issueId = "issue-" + id;
                    this.setState({error: ''});
                    this.props.updateBoard(obj);
                });

            });

        });
        

        issueTypeValue = 'Task';
        descriptionContent = '';
        priorityValue = 'Medium';

        this.close();
    }


    render() {
        /* const actions = [
            { text: 'Submit', onClick: this.sendPostRequest },
            { text: 'Close', onClick: this.close },
        ]; */

        const footer = (props: FooterProps) => (
            <ModalFooter showKeyline={props.showKeyline}>
                <span />
                <Button appearance="primary" type="submit">
                    Create Issue
                </Button>
            </ModalFooter>
        );

        interface ContainerProps {
            children: React.ReactNode;
            className?: String;
        }

        return (
            <div>
                <Fab style={{ backgroundColor: "#0052CC", borderSpacing: '1.2em' }} size="large" color="primary" aria-label="Create Issue" variant="extended" onClick={() => this.open()}>
                    <AddIcon />
                    Create Issue
                </Fab>
                <Button appearance="primary" onClick={() => this.open()}>Create Issue</Button>
                    <ModalTransition>
                        {this.state.isOpen && (
                            <ModalDialog
                            onClose={this.close}
                            width="40%"
                            scrollBehavior="outside"
                            components={{
                            Container: ({ children, className }: ContainerProps) => (
                                <Form onSubmit={this.onFormSubmit}>
                                {({ formProps }) => (
                                    <form {...formProps} className={className}>
                                    {children}
                                    </form>
                                )}
                                </Form>
                            ),
                            Footer: footer,
                            }}
                            >
                                <Container>
                                    <Heading>Create Issue</Heading>
                                    <SubHeading>Issue Type</SubHeading>
                                        {/*<Dropdown initialOption={issueTypeValue} optionsArray={['Story', 'Bug']} selectOption={this.setIssueType}/> */}
                                        <TypeDropDown optionsArray={null} selectOption={this.setIssueType}  index={null} defaultVal={null} />
                                        <BottomPadding />
                                        <SubHeading>Summary</SubHeading>
                                        <Field label="" name="summary" defaultValue="">
                                        {({ fieldProps }) => (
                                            <Textfield
                                                autoComplete="off"
                                                {...fieldProps}
                                            />
                                        )}
                                        </Field>
                                        <BottomPadding />
                                        <SubHeading>Description</SubHeading>
                                        <Description onChangeValue={this.handleChangeValue} />
                                        <BottomPadding />
                                        {/* <Reporter /> */}
                                        <SubHeading>Assignee</SubHeading>
                                        <Assignee members={this.props.members} setAssignee={this.setAssignee} currentAssigneeName={null} currentAssigneeAvatar={null}/>
                                        <BottomPadding />
                                        <SubHeading>Priority</SubHeading>
                                        {/* <Priority priority={priorityValue} setPriority={this.setPriority} /> */}
                                        <TestPriority setPriority={this.setPriority} defaultVal={null} />
                                        {this.state.error === 'NO_ISSUE_TYPE' && (
                                            <ErrorMessage>
                                            Please select an issue type. 
                                            </ErrorMessage>
                                        )}
                                        {this.state.error === 'NO_PRIORITY' && (
                                            <ErrorMessage>
                                            Please select a priority. 
                                            </ErrorMessage>
                                        )}

                                        <BottomPadding />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                </Container>
                            </ModalDialog>
                        )}
                    </ModalTransition>
            </div>
        );
    }
}
