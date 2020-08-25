import React, { useState } from 'react';

import TextField from '@atlaskit/textfield';
import Form, { Field, FormFooter, ErrorMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';

import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from 'react-router-dom';

import Api from '../api-config';

function TeamRequest(user) {

    const [emptyStringError, setEmptyStringError] = useState(false);
    const [redirectUser, setRedirectUser] = useState(false);

    const history = useHistory();

    const [isOpen, setIsOpen] = useState(true);
    const [success, setSuccess] = useState(false);

    function redirect() {
        setRedirectUser(true);
    }

    function sendRequest(data) {
        //username argument is an object

        axios({
            method: 'post',
            url: Api.domain + 'request/',
            data: {
                teamName: data['team-name'],
                requestor: user.username,
                requestor_avatar: user.avatar,
            }
        }).then((response) => {
            if (response.data) {
                setEmptyStringError(false);
                user.closeModal();
            }
            else {
                setEmptyStringError(true);
            }
        });

    }

    if (redirectUser) {
        history.push("/");
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={user.closeModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Join a Team</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of a team that has already been created by another user. A request will
                    be sent to the owner of the team.
                </DialogContentText>
                <Form onSubmit={(data) => sendRequest(data)}>
                        {({ formProps }) => (
                            <form {...formProps} name="text-fields">
                                <Field name="team-name" defaultValue="My Team" label="">
                                    {({ fieldProps }) => <TextField {...fieldProps} />}
                                </Field>
                    <FormFooter>
                        <DialogActions>
                            <Button appearance="secondary" onClick={user.closeModal} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" appearance="primary">
                                    Join Team
                            </Button>
                        </DialogActions>
                    </FormFooter>
                            </form>
                        )}
                    </Form>
                    {emptyStringError === true && (
                        <ErrorMessage>Invalid team name. The name of the team you entered could not be found.</ErrorMessage>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeamRequest;