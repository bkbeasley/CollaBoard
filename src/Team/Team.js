import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { useHistory, Redirect } from 'react-router-dom';

import Api from '../api-config';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import TopAppBar from '../TopAppBar';
Amplify.configure(awsconfig);

const Spacing = styled.div`
    display: inline-block;
    padding: 15px;
`

const Container = styled.div`
    max-width: 200px;
    margin: auto;
    padding-left: 4em;
`

const LoadingContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Heading = styled.h3`
    color: #172B4D;
    padding-top: .7em;
    padding-bottom: 1.2em;
    font-weight: bold;
`

const SubHeading = styled.h5`
    color: #5E6C84;
    font-weight: bold;
    margin-bottom: 0em;
    font-size: 17px;
    padding-bottom: .3em;
`

const Text = styled.p`
    color: #5E6C84;
    padding-top: 1.2em;
    font-style: italic;
`

const ListContainer = styled.div`
    text-align: center;

`

const ToolTipStyled = withStyles((theme) => ({
    arrow: {
        color: '#5243AA',
      },
    tooltip: {
      backgroundColor: "#5243AA",
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }))(Tooltip);

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

  

const avatarUrl = 'https://api.adorable.io/avatars/285/';

function Team(props) {

    if (props.history.location.state === undefined) {
        props.history.location.state = {};
    }

    useEffect(() => {
        checkUser()
      }, []); 

    useEffect(() => {
        loadRequests()
    }, []);

    useEffect(() => {
        getRequestorAvatar()
    }, []);
    
    const history = useHistory();

    const [teamName, setTeamName] = useState(props.history.location.state.teamName);
    const [teamOwner, setTeamOwner] = useState(props.history.location.state.teamOwner);
    const [members, setMembers] = useState(props.history.location.state.members);
    const [requests, setRequests] = useState(null);
    const [currentUser, setCurrentUser] = useState(props.history.location.state.currentUser);
    const [isLoading, setIsLoading] = useState(true);
    const [toDashboard, setToDashboard] = useState(false);

    const classes = useStyles();

    async function checkUser() {

        try{
            const data = await Auth.currentUserPoolUser()
            const userInfo = { username: data.username, ...data.attributes, }
            let username = userInfo['username'];

            //If the user has not created a team, return them to the dashboard
            let isTeamMem = await checkTeamMember(username);

            if (isTeamMem) {
                setToDashboard(true);
                setIsLoading(false);
                return;
            }

            signedInNoProps(username);
            loadRequestsNoProps(username);
            //setMembers([]);

        }
        catch (err) {
            if (err === 'No current user') {
                history.push('/login');  
            } 
            console.log('error: ', err);
        }
    }

    async function checkTeamMember(username) {
        await axios({
            method: 'post',
            url: Api.domain + 'users/team-member',
            data: {
                username: username,
            }
        }).then(response => {
            if (response.data === true) {
                return true
            }
            else {
                return false;
            }
        });
    }

    async function signedInNoProps(username) {
        await axios({
            method: 'post',
            url: Api.domain + 'users/team-owner',
            data: {
                username: username,
            }
        }).then((response) => {
            setTeamOwner(response.data);

            axios({
                method: 'post',
                url: Api.domain + 'users/team-name',
                data: {
                    username: username,
                }
            }).then((response) => {
                setTeamName(response.data);
                loadMembersNoProps(response.data);
            })
        });
    }

    function loadRequests() {
        
        if (!teamOwner) {
            return;
        }

        axios({
            method: 'post',
            url: Api.domain + 'request/view',
            data: {
                owner: currentUser,
            }
        }).then((response) => {
            setRequests(response.data);
        }) 
    }

    function acceptRequest(requestor, index) {
        axios({
            method: 'put',
            url: Api.domain + 'users/team-name',
            data: {
                username: requestor,
                teamName: teamName,
            }
        }).then(() => {
            axios({
                method: 'put',
                url: Api.domain + 'users/team-member',
                data: {
                    username: requestor,
                }
            }).then(() => {
                updateUserMembership(requestor);
                deleteRequest(requestor, index);
            })
        })
    }

    function loadRequestsNoProps(username) {

        axios({
            method: 'post',
            url: Api.domain + 'request/view',
            data: {
                owner: username,
            }
        }).then((response) => {
            setRequests(response.data);
        });
    }

    function loadMembersNoProps(teamName) {
        
        axios({
            method: 'post',
            url: Api.domain + 'teams/members',
            data: {
                name: teamName,
            }
        }).then((response) => {
            setMembers(response.data);
            setIsLoading(false);
        });
    }

    function deleteRequest(requestor, index) {
        axios({
            method: 'DELETE',
            url: Api.domain + 'request/',
            data: {
                requestor: requestor,
            }
        }).then(() => {
            //Remove the request from state
            let newRequests = requests;
            newRequests.splice(index, 1);
            setRequests(newRequests);
            history.go(0);
        })
    }

    function updateUserMembership(requestor) {
        let boardId = null;

        axios({
            method: 'PUT',
            url: Api.domain + 'users/board-member',
            data: {
                username: requestor,
            }
        }).then( () => {
            //Get the board id from the board owner
            axios({
                method: 'POST',
                url: Api.domain + 'users/board-id',
                data: {
                    username: currentUser,
                }
            }).then( response => {
                boardId = response.data;

                axios({
                    method: 'PUT',
                    url: Api.domain + 'users/board-id',
                    data: {
                        username: requestor,
                        boardId: boardId,
                    }
                }).then( () => {

                })
            })

        });
    }

    function getRequestorAvatar() {
        if (requests === null) {
            return;
        }

        axios({

        })
    }

    if (isLoading) {
        return(
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        )
    }

    if (toDashboard) {
            history.push('/dashboard'); 
    }

    //If the user is signed in
    if (members !== undefined){

        return (
            <div>
                <TopAppBar />
                <Heading>{teamName}</Heading>
                <br />
                <br />
                <SubHeading>Team Members:</SubHeading>
                <Container>
                    <AvatarGroup max={6}>
                {members.map(member => (
                    <ToolTipStyled title={member.username} placement="bottom" arrow>
                        <Avatar alt={member.username} src={avatarUrl + member.avatar} />
                    </ToolTipStyled>
                ))}
                    </AvatarGroup>
                </Container>

                {teamOwner && (
                    <div>
                        <br />
                        <SubHeading>Pending Requests:</SubHeading>

                        {requests !== null && !requests.length && (
                            <Text>There are no pending requests to join this team.</Text>
                        )}
                        <ListContainer>
                        <List className={classes.root}>
                        {requests !== null && requests.map((requestor, index) => {
                            return(
                            <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={requestor.requestor} src={requestor.requestor_avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={requestor.requestor}
                                    secondary={
                                        <div>
                                            <Spacing>
                                            <Button variant="success" onClick={() => acceptRequest(requestor.requestor, index)}>Accept</Button>
                                            </Spacing>
                                            <Button variant="danger" onClick={() => deleteRequest(requestor.requestor, index)}>Decline</Button>
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </div>
                            );
                        })}
                        </List>
                        </ListContainer>
                    </div>
                )}
            </div>
        )
    }
    //If the user is not signed in, redirect them
    else {
        return null;
    }

}

export default Team