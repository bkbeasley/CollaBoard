import React, { useState } from 'react';

import TextField from '@atlaskit/textfield';
import Form, { Field, FormFooter, ErrorMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';

import axios from 'axios';

import { useHistory, Redirect } from 'react-router-dom';

import TeamStage from './Team/TeamStage';
import Team from './Team/Team';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Api from './api-config';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

let teamName ='';

function CreateTeam(props) {

    const [nameExistsError, setNameExistsError] = useState(false);
    const [username, setUsername] = useState(false);
    const [teamName,setTeamName] = useState(false);
    const [teamOwner, setTeamOwner] = useState(null);
    const [redirect, setRedirect] = useState(false);

    function updateUserTeam(name) {
        let currentUser = props.currentUser;
        let teamName = name;

        //Update team_name > team_member > team_owner 
        axios({
            method: 'put',
            url: Api.domain + 'users/team-name',
            data: {
                username: currentUser,
                teamName: name,
            }
        }).then(() => {
            axios({
                method: 'put',
                url: Api.domain + 'users/team-member',
                data: {
                    username: currentUser,
                }
            }).then(() => {
                axios({
                    method: 'put',
                    url: Api.domain + 'users/team-owner',
                    data: {
                        username: currentUser,
                    }
                }).then(() => {
                    setUsername(currentUser);
                    setTeamName(teamName);
                    setTeamOwner(true);
                    setRedirect(true);                    
                });
            });
        });
    }

    function postData(data) {

        axios({
            method: 'post',
            url: Api.domain + 'teams/',
            data: {
                teamName: data['team-name'],
                owner: props.currentUser,
            }
        }).then((response) => {
            //If the name already exists
            if (response.data === true) {
                setNameExistsError(true);
            }
            else {
                updateUserTeam(data['team-name']);
            }

        }); 
    }

    if (redirect) {
        return (
            <TeamStage teamName={teamName} teamOwner={teamOwner} currentUser={username} />
        )
    }
    return(
        <div>
            <Dialog open={true} onClose={props.closeModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Start a Team</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter the name of your new team. Team names must be unique.
                </DialogContentText>
                <Form onSubmit={(data) => postData(data)}>
                    {({ formProps }) => (
                        <form {...formProps} name="text-fields">
                            <Field name="team-name" defaultValue="My Team" label="Team Name">
                                {({ fieldProps }) => <TextField {...fieldProps} />}
                            </Field>
                <FormFooter>
                    <DialogActions>
                    <Button appearance="secondary" onClick={props.closeModal} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" appearance="primary">
                            Submit
                    </Button>
                </DialogActions>
                </FormFooter>
                        </form>
                    )}
                </Form>
                {nameExistsError && (
                    <ErrorMessage>That name already exists. Your team name must be unique.</ErrorMessage>
                )}
                </DialogContent>
            </Dialog>
        </div>
    );
    
}

export default CreateTeam