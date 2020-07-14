import React, {useState, Component } from 'react';

import { useHistory, Redirect } from 'react-router-dom';

import axios from 'axios';

import Api from '../api-config';

function TeamStage(data) {
    const history = useHistory();
    let teamName = data.teamName;
    let teamOwner = data.teamOwner;
    let currentUser = data.currentUser;

    const [members, setMembers] = useState([]);

    //Retrieve a list of all team members
    axios({
        method: 'post',
        url: Api.domain + 'teams/members',
        data: {
            name: teamName,
        }
    }).then((response) => {
        setMembers(response.data);
        redirectToTeam(response.data);
    });

    function redirectToTeam(memberList) {
        history.push("/team", { teamName: teamName, teamOwner: teamOwner, members: memberList, currentUser: currentUser, });
    }

    return null;
}

export default TeamStage;