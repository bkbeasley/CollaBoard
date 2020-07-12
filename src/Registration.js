import React, { Fragment, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';

import CreateAccountButton from '@material-ui/core/Button';

import axios from 'axios';

import Form, { Field, FormFooter, ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';

import TextField from '@atlaskit/textfield';

import styled from 'styled-components';

import Amplify, { Auth, signInButton } from 'aws-amplify';
import awsconfig from './aws-exports';
import TopAppBar from './TopAppBar';

Amplify.configure(awsconfig);

let username = '';
let password = '';

const Container = styled.div`
  max-width: 40%;
`

const CreateStyle = styled.div`
  padding-right: 5em;
`

export default function Registration() {
    useEffect(() => {
        signOut()
      }, []);

    const history = useHistory();
    
     async function registerUser(userData) {
        username = userData.username;
        password = userData.password;

        try {
            const user = await Auth.signUp({
                username,
                password,
                attributes: {'custom:hasBoard': 'false', 'custom:boardId': 'null',}
            });

            //Add the user to the backend users table
            addUser();

            //Sign the new user in
            signIn();
        } catch (error) {
            console.log('error signing up:', error);
        }

        /* axios({
            method: 'post',
            url: 'http://localhost:8080/api/users',
            data: {
                username: userData.username,
                password: userData.password,
            }
        }).then(() => {
            history.push("/board", 
            {   data: null, 
                boardMember: false,
            });
        }) */
    }

    function addUser() {
        let avatar = generateAvatar();

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/',
            data: {
                username: username,
                avatar: avatar,
            }
        }).then(() => {
                //console.log("Finished adding new user");
            
        });
    }

    function generateAvatar() {
        let name = Math.random().toString(36).substring(10);
        let domain = Math.random().toString(36).substring(4);
        let final = name + '@' + domain;
        return final;
    }

    async function signIn() {
        
        try {
            const user = await Auth.signIn(username, password);
            history.push("/dashboard")
            
        } catch (error) {
            console.log('error signing in', error);
        }
    
    }

    //If the user is trying to access this page and they're signed in, sign them out
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    //If the user is trying to access this page and they're signed in, sign them out
    /* try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    } */


    
    return (
        <div>
            <TopAppBar />
            <Container>
        <Form onSubmit={data => registerUser(data)}>
        {({ formProps, submitting }) => (
            <form {...formProps}>
            <Field
                name="username"
                label="User name"
                isRequired
                defaultValue=""
            >
                {({ fieldProps, error }) => (
                <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                    {!error && (
                    <HelperMessage>
                        You can use letters, numbers & symbols.
                    </HelperMessage>
                    )}
                    {error && (
                    <ErrorMessage>
                        This user name is already in use, try another one.
                    </ErrorMessage>
                    )}
                </Fragment>
                )}
            </Field>
            <Field
                name="password"
                label="Password"
                defaultValue=""
                isRequired
                validate={value =>
                value && value.length < 6 ? 'TOO_SHORT' : undefined
                }
            >
                {({ fieldProps, error, valid, meta }) => (
                <Fragment>
                    <TextField type="password" {...fieldProps} />
                    {!error && !valid && (
                    <HelperMessage>
                        Use 6 or more characters with a mix of letters, numbers &
                        symbols.
                    </HelperMessage>
                    )}
                    {error && (
                    <ErrorMessage>
                        Password needs to be more than 8 characters.
                    </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                    <ValidMessage>Great password!</ValidMessage>
                    ) : null}
                </Fragment>
                )}
            </Field>
            <FormFooter>
{/*                 <CreateStyle>
                    <CreateAccountButton color="primary" href="/register">Create Account</CreateAccountButton>
                </CreateStyle> */}
                <ButtonGroup>
                {/* <Button appearance="subtle">Cancel</Button> */}

                <Button type="submit" appearance="primary" isLoading={submitting}>
                    Sign Up
                </Button>
                </ButtonGroup>
            </FormFooter>
            </form>
        )}
        </Form>
        </Container>
        </div>
    );

}


