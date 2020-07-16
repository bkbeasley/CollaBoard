import React, { Fragment, Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';
import axios from 'axios';

import CreateAccountButton from '@material-ui/core/Button';

import Form, { Field, FormFooter, ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';

import TextField from '@atlaskit/textfield';

import styled from 'styled-components';

import TopAppBar from './TopAppBar';

import authConfig from './index';

import Amplify, { Auth, signInButton } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure({
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-2_86ZemgUAF',

      // REQUIRED - Amazon Cognito Region
      region: 'us-east-2',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'aluu9k2i3cb48f29sub579fpk',

  }
});

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

  async function validateUser(userData) {
    const username = userData.username;
    const password = userData.password;

      try {
        console.log("WELCOME ");
        await Auth.signIn(username, password);
        history.push("/dashboard")
        
    } catch (error) {
        console.log('error signing in', error);

        if (error.message === "User does not exist.") {
          setLoginError(true);
        }
        else if (error.message === "Incorrect username or password.") {
          setLoginError(true);
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
                value && value.length < 8 ? 'TOO_SHORT' : undefined
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
                </Fragment>
              )}
            </Field>
            <FormFooter>
              <CreateStyle>
                <CreateAccountButton color="primary" href="/register">Create Account</CreateAccountButton>
              </CreateStyle>
              <ButtonGroup>
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
 