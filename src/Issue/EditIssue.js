import React, { Component } from 'react';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import Form, { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import axios from 'axios';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';

import IssueType from '../Issue/Modal/IssueType';
import Description from '../Issue/Modal/Description';
//import Comments from '../Issue/Modal/Comments';
import Assignee from './Modal/Assignee';
import Reporter from './Modal/Reporter';
import Priority from './Modal/Priority';
import Dropdown from './Modal/Dropdown';
import TestPriority from './Modal/TestPriority';

import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
    display: inline-block;
`

const Left = styled.div`
    float:left;
`

const Right = styled.div`
    float:right;
    padding-left: 10em;
    padding-top: 1.5em;
    
`

const ModalTop = styled.div`
    float: right;
    padding-left: 3.5em;
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

const ToolTipStyled = withStyles((theme) => ({
    arrow: {
        color: '#DE350B',
      },
    tooltip: {
      backgroundColor: "#DE350B",
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }))(Tooltip);

let issueTypeValue = '';
let descriptionContent = '';
let priorityValue = '';
let assignee_username = '';
let assignee_avatar = '';

export default class EditIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModalOpened: false,
        }
        priorityValue = this.props.issue.priority;
        issueTypeValue = this.props.issue.type;
    }

    setIssueType = (val) => {
        issueTypeValue = val;
    }

    handleChangeValue = (val) => {
        descriptionContent = val;
        //console.log("description content:",descriptionContent);
    }

    setPriority = (val) => {
        priorityValue = val;
    }

    setAssignee = (val) => {
        assignee_username = val.username;
        assignee_avatar = val.avatar;
    }

    onFormSubmit = data => {
        const updatedIssue = {
            type: issueTypeValue,
            summary: data.summary,
            description: descriptionContent,
            priority: priorityValue,
            assignee_username: assignee_username,
            assignee_avatar: assignee_avatar,
        };
        this.sendPutRequest(updatedIssue);
    }

    sendPutRequest = issue => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/issues/edit',
            data: {
                issue_id: parseInt(this.props.issue.issueId.replace("issue-","")),
                type: issue.type,
                summary: issue.summary,
                description: issue.description,
                priority: issue.priority,
                assignee_username: issue.assignee_username,
                assignee_avatar: issue.assignee_avatar,
            }
        }).then(() => {
            this.props.issue.type = issue.type;
            this.props.issue.summary = issue.summary;
            this.props.issue.description = issue.description;
            this.props.issue.priority = issue.priority;
            this.props.issue.assignee_username = issue.assignee_username;
            this.props.issue.assignee_avatar = issue.assignee_avatar;
            this.props.closeModal();
        })
    }

    openDeleteModal = () => {
        this.setState({deleteModalOpened: true,})

        //this.props.deleteIssue(this.props.issue.issueId); 
    }

    closeDeleteModal = () => {
        this.setState({deleteModalOpened: false,})
    }

    deleteIssue = () => {
        this.props.deleteIssue(this.props.issue.issueId);
    }

    render() {
        const footer = (props: FooterProps) => (
            <ModalFooter showKeyline={props.showKeyline}>
                <span />
                <Button appearance="primary" type="submit">
                    Save
                </Button>
            </ModalFooter>
        );

        interface ContainerProps {
            children: React.ReactNode;
            className?: String;
        }

        const deleteIssueActions = [
            { text: 'Delete', onClick: this.deleteIssue },
            { text: 'Cancel', onClick: this.closeDeleteModal },
        ];

        return (
            <div>
                {this.state.deleteModalOpened && (
                    <ModalTransition>
                    <ModalDialog
                     actions={deleteIssueActions}
                     onClose={this.props.closeModal}
                     heading= "Are you sure you want to delete this issue?"
                     appearance="danger"
                    >
                    </ModalDialog>
                </ModalTransition>
                )}
                <ModalTransition>
                    {this.props.isOpen && (
                    <ModalDialog
                        width="45%"
                        onClose={this.props.closeModal}
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
                        <ModalTop>
                            <ToolTipStyled title="Delete Issue" placement="bottom" arrow>
                                <Button onClick={() => this.openDeleteModal()} iconBefore={<DeleteIcon />} />
                            </ToolTipStyled>
                                {/*<Button iconBefore={<EditorCloseIcon size="large" />} onClick={this.props.closeModal} /> */}
                        </ModalTop>
                        <Left>
                            <br/>
                            <SubHeading>Issue Type</SubHeading>
                            <IssueType type={this.props.issue.type} index={this.props.issue.index} setType={this.setIssueType} />
                            <BottomPadding />
                            <SubHeading>Summary</SubHeading>
                            <Field label="" name="summary" defaultValue={this.props.issue.summary}>
                                {({ fieldProps }) => (
                                    <Textfield
                                        autoComplete="off"
                                        {...fieldProps}
                                    />
                                )}
                            </Field>
                            <BottomPadding />
                            <SubHeading>Description</SubHeading>
                            <Description description={this.props.issue.description} onChangeValue={this.handleChangeValue} />
                            <BottomPadding />
{/*                             <SubHeading>Comments</SubHeading>
                            <Comments comments={this.props.issue.comments} issue={this.props.issue} /> */}
                            </Left>
                            <Right>
                                <SubHeading>Reporter</SubHeading>
                                <Reporter username={this.props.issue.reporter_username} avatar={this.props.issue.reporter_avatar} />
                                <BottomPadding />
                                <SubHeading>Assignee</SubHeading>
                                <Assignee members={this.props.members} currentAssigneeName={this.props.issue.assignee_username} currentAssigneeAvatar={this.props.issue.assignee_avatar} setAssignee={this.setAssignee} />
                                <BottomPadding />
                                {/*<Priority priority={this.props.issue.priority} setPriority={this.setPriority} /> */}
                                <SubHeading>Priority</SubHeading>
                                <TestPriority defaultVal={this.props.issue.priority} setPriority={this.setPriority} />
                            </Right>
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