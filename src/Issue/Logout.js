import React, { useEffect, useState } from 'react';
import Button from '@atlaskit/button';

import { useHistory, Redirect } from 'react-router-dom';

import Amplify, { Auth, signInButtonContent } from 'aws-amplify';
import awsconfig from '../aws-exports';
import Home from '../Home';

Amplify.configure(awsconfig);

let currentUser = null;

export default function Logout() {
    useEffect(() => {
        checkUser()
      }, [])

    const history = useHistory();

    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState(null);

    //Determine if the user is logged in
    async function checkUser() {
        try {
            currentUser = await Auth.currentUserPoolUser();
            setUser(currentUser);
            signOut();
            setRedirect(true);
        }
        catch(error) {
            if (error === "No current user") {
                history.push("/");
            }
            console.log("Error: ", error);
        }
    }

    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            setRedirect(true);
        } catch (error) {
            console.log('error signing out: ', error);
            Auth.signOut();
        }
    }

    if (user === null) {
        return (
            <div></div>
        );
    }

    if (redirect === true) {
        console.log("YOYUOYO ", user);
        return (
            <Home />
        )
    }

    return null;

    

    /* return (
        <Button appearance="primary" onClick={() => signOut()}>Logout</Button>
    ); */

}