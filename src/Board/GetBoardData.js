import React, { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify';

import axios from 'axios';
import Board from './Board';
import transformResponseData from '../transformResponseData';

import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';

import { useHistory, Redirect } from 'react-router-dom';


let username = null;
let hasBoard = null;
let boardData = null;
let teamMembers = null;
let teamName = null;
let currentUser = null;
let boardName = '';
let noTeam = false;

const avatarUrl = 'https://api.adorable.io/avatars/285/';

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

function GetBoardData() {

    useEffect(() => {
        checkUser()
      }, []);

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    let result, boardId;

    async function checkUser() {

        try{
            const data = await Auth.currentUserPoolUser()
            const userInfo = { username: data.username, ...data.attributes, }
            username = userInfo['username'];

            result = await Auth.currentUserInfo();

            //Testing
            await axios.post('http://localhost:8080/api/users/member', {
                username: username,
            })
            .then(response => {
                hasBoard = response.data;
            });
            //hasBoard = result.attributes['custom:hasBoard'];
            
            //let id = result.attributes['custom:boardId'];
            //id = parseInt(id);

            await axios.post('http://localhost:8080/api/users/board-id', {
                username: username,
            })
            .then(response => {
                boardId = parseInt(response.data);
            })

            //Testing to get the team name
            await axios.post('http://localhost:8080/api/users/team-name', {
                username: username
            }).then(response => {
                teamName = response.data;

                //If the user has not created a team
                if (teamName === '') {
                    noTeam = true;
                }
            })

            //boardId = id;
            await axios.post('http://localhost:8080/api/boards/get', {
                boardId: boardId,
            })
            .then(response => {
                boardName = response.data.boardName;
                boardData = transformResponseData(response.data);
                //getMembers();

                let obj = {};
                let finalMembers = [];

                //If the user has not created a team yet
                if (noTeam) {
                    axios.post('http://localhost:8080/api/users/avatar', {
                        username: username
                    })
                    .then(response => {
                        obj = {
                            username: username,
                            avatar: avatarUrl + response.data,
                        }
                        currentUser = obj;
                        finalMembers.push(currentUser);
                        teamMembers = finalMembers;
                        setLoading(false);
                        
                        return;
                    })
                }

                axios.post('http://localhost:8080/api/users/members/team-members', {
                    teamName: teamName,
                })
                .then(response => {
                    let members = response.data;

                    for (let i = 0; i < members.length; i++) {
                        obj = {
                            username: members[i].username,
                            avatar: avatarUrl + members[i].avatar,
                        }
                        finalMembers.push(obj);
                    }
                    teamMembers = finalMembers;
                    setCurrentUser(teamMembers);
                    setLoading(false);
                })  
            })  
        }
        catch (err) {
            //If the user is not logged in
            if (err === 'No current user') {
                history.push('/login');  
            } 
            console.log('error: ', err);
        }

    }

    function setCurrentUser(members) {

        for (let i = 0; i < members.length; i++) {
            if (members[i].username === username) {
                currentUser = members[i];
                return;
            }
        }
    }

    async function getMembers() {
        let obj;
        let finalMembers = [];

        await axios.post('http://localhost:8080/api/users/members/team-members', {
            teamName: "My Team",
        })
        .then(response => {
            let members = response.data;

            for (let i = 0; i < members.length; i++) {
                obj = {
                    username: members[i].username,
                    avatar: members[i].avatar,
                }
                finalMembers.push(obj);
            }
        });
    }

    if (!loading) {
        return (
            <Board data={boardData} members={teamMembers} currentUser={currentUser} boardName={boardName} />
        )
    }

    return (
        <Container>
            <CircularProgress />
        </Container>
    )

}

export default GetBoardData