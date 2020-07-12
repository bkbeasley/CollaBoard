import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

let currentUser = null;

export default function(props) {

    useEffect(() => {
        checkUser()
      }, [])

      const history = useHistory();

      const [user, setUser] = useState(null);
      const [redirect, setRedirect] = useState(false);

     //Determine if the user is logged in
     async function checkUser() {
        try {
            currentUser = await Auth.currentUserPoolUser();
            if (currentUser) {
                console.log("MMMMI",typeof props.path);
                setRedirect(true);
            }
            
            setUser(currentUser);
        }
        catch(error) {
            if (error === "No current user") {
                history.push("/login");
            }
            console.log("Error: ", error);
        }
    }

    if (user === null) {
        return (
            <div></div>
        );
    }

    if (redirect === true) {
        return (
            <Redirect to={{
                pathname: props.path,
                }} 
            />
        );
    }

};