import React, { Component } from 'react';
import styled from 'styled-components';

import TextField from '@atlaskit/textfield';
import Form, { Field, FormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';

import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory, Redirect } from 'react-router-dom';

import Amplify, { Auth, a } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Text = styled.h3`
    color: grey;
`

const Container = styled.div`
    display: flex;
    position: relative;
`

const Label = styled.label`
    float: left;
`
let data = null;

let owner;

export default class CreateBoard extends Component {

    state = {
        toBoard: false,
    }

    componentDidMount(){
        owner = this.props.owner;
    }

    async updateAttributes(boardId) {
        try {
            
            //let result = await Auth.currentUserInfo();
            //console.log("result: ", result);

            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.updateUserAttributes(user, {'custom:hasBoard': 'true', 'custom:boardId': boardId},);
                })
                .then(data => {
                    if (data === "SUCCESS") {
                        this.updateBoardId(boardId);
                        this.loadBoardData(boardId);
                    }
                    else {
                        console.log("ERROR", data);
                    }
                    
                    //console.log(data);
                })
                .catch(err => console.log(err));
        } 
        catch (err) { 
            
            console.log('error: ', err) 
        }
    }

    updateBoardId(boardId) {
        const id = parseInt(boardId);

        axios.put('http://localhost:8080/api/users/board-id', {
            boardId: id,
            username: owner,
        })
        .then(response => {
            this.updateBoardMember();
        });
    }

    updateBoardMember() {
        axios.put('http://localhost:8080/api/users/board-member', {
            username: owner,
        })
        .then( () => {

        });
    }


    loadBoardData(boardId) {
        const id = parseInt(boardId);
        axios.post('http://localhost:8080/api/boards/get', {
            boardId: id,
        })
        .then(response => {
            data = response.data;
            this.setState({
                toBoard: true,
            })
        })
    }

    postData(data) {
        const column1 = {"title": data["column-1"], "position": 0};
        const column2 = {"title": data["column-2"], "position": 1};
        const column3 = {"title": data["column-3"], "position": 2};
        const column4 = {"title": data["column-4"], "position": 3};

        const columns = [column1, column2, column3, column4];

        //let testC = [{"title": "P", "position": 3,}];

        //this.updateAttributes('2');

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/boards',
            data: {
                columns: columns,
                boardName: data['board-name'],
            }
        }).then((response) => {
            this.updateBoardOwner();
            this.updateAttributes(response.data.toString());
        });
    }

    updateBoardOwner() {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/users/board-owner',
            data: {
                username: owner,
            }
        }).then((response) => {
            //console.log("finished updating board owner ", response.data);
        });
    }

    render() {
        if (this.state.toBoard === true) {
            return <Redirect to={{
                pathname: '/board',
                state: { dataSent: data }
                }} 
                />
        }
        return(
            <div>
                <Dialog open={true} onClose={this.props.closeModal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create a New Board</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please fill out the fields below to create a new board.
                    </DialogContentText>
                        <Form onSubmit={(data) => this.postData(data)}>
                            {({ formProps }) => (
                                <form {...formProps} name="text-fields">
                                    <Field name="board-name" defaultValue="Kanban Board" label="Board Name">
                                        {({ fieldProps }) => <TextField {...fieldProps} />}
                                    </Field>
                                    <Field name="column-1" defaultValue="Backlog" label="Column 1">
                                        {({ fieldProps }) => <TextField {...fieldProps} />}
                                    </Field>
                                    <Field name="column-2" defaultValue="To Do" label="Column 2">
                                        {({ fieldProps }) => <TextField {...fieldProps} />}
                                    </Field>
                                    <Field name="column-3" defaultValue="In Progress" label="Column 3">
                                        {({ fieldProps }) => <TextField {...fieldProps} />}
                                    </Field>
                                    <Field name="column-4" defaultValue="Done" label="Column 4">
                                        {({ fieldProps }) => <TextField {...fieldProps} />}
                                    </Field>

                            <FormFooter>
                                <DialogActions>
                                    <Button appearance="secondary" onClick={this.props.closeModal} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" appearance="primary">
                                        Create Team
                                    </Button>
                                </DialogActions>
                            </FormFooter>
                                    </form>
                                )}
                        </Form>
                        </DialogContent>
                        </Dialog>
            </div>
        );
    }
}