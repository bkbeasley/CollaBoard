import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const Heading = styled.p`
    color: #BF2600;
`

function LogoutStage() {

    const [redirect, setRedirect] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 2000);
        
    return () =>clearTimeout(timer);
    }, []);

    if (redirect) {
        history.push('/');
    }

    return(
        <Heading>You have been signed out and will be redirected to the home page.</Heading>
    )
}

export default LogoutStage