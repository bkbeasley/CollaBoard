import React, { Fragment, Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';
import axios from 'axios';

import CreateAccountButton from '@material-ui/core/Button';

import Form, { Field, FormFooter, ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';

import TextField from '@atlaskit/textfield';

import Amplify, { Auth, signInButton } from 'aws-amplify';
import awsconfig from './aws-exports';

import styled from 'styled-components';

import TopAppBar from './TopAppBar';

Amplify.configure(awsconfig);

let loginError = false;

const Container = styled.div`
  max-width: 40%;
`

const CreateStyle = styled.div`
  padding-right: 5em;
`

export default function Login() {
  
   const history = useHistory();
   const [loginError, setLoginError] = useState(false);

  /* function validateUser(userData) {
  
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/users/validate',
      data: {
          username: userData.username,
          password: userData.password,
      }
    }).then(response => {
        if (!response.data) {
          console.log("Incorrect username or passsword.");
        }
        else {
          isBoardMember(userData.username);
        }
    })
  }

  function isBoardMember(username) {
    const name = username;
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/users/member',
      data: {
          username: name,
      }
      }).then(response => {
        //If the user is not a member of a Board
          if (!response.data) {
            history.push("/board", 
            {   dataSent: null, 
                boardMember: false,
            });
          }
          else {
            getBoardData(name);
          }  
     })
  }

  function getBoardData(username) {
    axios.post('http://localhost:8080/api/boards/get2', {
            username: username,
        })
        .then(response => {
          history.push("/board", { dataSent: response.data, boardMember: true })
        })
  } */

  async function validateUser(userData) {
    //setLoginError(true);
    const username = userData.username;
    const password = userData.password;

      try {
        await Auth.signIn(username, password);
        history.push("/dashboard")
        
    } catch (error) {
        console.log('error signing in', error);

        if (error.message === "User does not exist.") {
          
          setLoginError(true);
          console.log("HH", loginError);
        }
    }

  }

    return (
        <div>
        <TopAppBar />
        <Container>
        <Form onSubmit={data => validateUser(data)}>
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
                      You can use letters, numbers & periods.
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
                value && value.length < 4 ? 'TOO_SHORT' : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => (
                <Fragment>
                  <TextField type="password" {...fieldProps} />
                  {!error && !valid && (
                    <HelperMessage>
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      Password needs to be more than 8 characters.
                    </ErrorMessage>
                  )}
                  {valid && meta.dirty ? (
                    <ValidMessage>Awesome password!</ValidMessage>
                  ) : null}
                </Fragment>
              )}
            </Field>
            <FormFooter>
              <CreateStyle>
                <CreateAccountButton color="primary" href="/register">Create Account</CreateAccountButton>
              </CreateStyle>
              <ButtonGroup>
                {/*<Button appearance="subtle">Cancel</Button> */}
                <Button type="submit" appearance="primary" isLoading={submitting}>
                  Log In
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>

      {loginError === true && (
            <div>
              <ErrorMessage>
                Invalid username or password.
              </ErrorMessage>
            </div>
          )}

      </Container>
      </div>
    );
}

/* export default class Login extends React.Component() {
    //const history = useHistory();
    //const axios = require('axios').default;

  /*   getBoardData() {
        let boardData = null;
        axios({
            method: 'get',
            url: 'http://localhost:8080/login2',
            data: {
                
            }
        }).then(() => {
            console.log("IIIDJID");
        })

        /* axios.post('http://localhost:8080/api/login', {
            username: 'at',
        })
        .then(response => {
            boardData = response.data;
            history.push("/board", { dataSent: boardData });
        })
        .catch(error => console.log(error)) */
    
    
    /* return (
        <Button appearance="primary" onClick={getBoardData}>Log In</Button>
    ) */    
    
 

 