import React, { useState, useEffect } from 'react';

import Button from '@atlaskit/button';

import { useHistory, Redirect } from 'react-router-dom';

import { Auth } from 'aws-amplify';
//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import styled from 'styled-components';

import axios from 'axios';
import BoardData from './BoardData';
import TeamStage from '../Team/TeamStage';
import TeamRequest from '../Team/TeamRequest';

import Avatar from '@atlaskit/avatar';

import SideBar from '../SideBar';

import { push as Menu } from 'react-burger-menu';
import '../assets/css/side-bar.css';

import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PersonIcon from '@atlaskit/icon/glyph/person';
import BoardIcon from '@atlaskit/icon/glyph/board';

import Nav from 'react-bootstrap/Nav';

import CircularProgress from '@material-ui/core/CircularProgress';

import TopAppBar from '../TopAppBar';
import CreateBoard from '../Board/CreateBoard';
import CreateTeam from '../CreateTeam';


const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Link = styled.a`
    padding-bottom: 1.0em;
    text-align: left;
    :hover {
        color: #ffffff;
        text-decoration: none;
        opacity: .8;
    }
`

const LinkContainer = styled.span`
    border: 5px;
`

const HeadingText = styled.h2`
    color: #091E42;
    text-align: left;
    padding-left: 11.8em;
    font-weight: bold;
`

const Row = styled.div`
    display: flex;
`

const Column = styled.div`
    flex: ${(props) => props.size};
`

const SubHeadingText = styled.h3`
    color: #091E42;
    font-weight: bold;
    text-align: left;
    padding-top: 1.5em;
`

const DetailText = styled.p`
    color: rgba(9, 30, 66, 0.64);
    text-align: left;
    font-weight: bold;
`

const UsernameText = styled.p`
    color: #172B4D;
    padding-left: .5em;
    font-weight: bold;
`

const AvatarCol = styled.div`
    padding-left: .5em;
`

const BoardButton = styled.div`
    text-align: left;
`

const BoardText = styled.p`
    color: #172B4D;
    font-weight: bold;
    text-align: left;
`

const NoBoardText = styled.p`
    color: #7A869A;
    font-style: italic;
    text-align: left;
`

const TeamButton = styled.div`
    text-align: left;
`

const TeamText = styled.p`
    color: #172B4D;
    font-weight: bold;
    text-align: left;
`

const NoTeamText = styled.p`
    color: #7A869A;
    font-style: italic;
    text-align: left;
`

const AccountDetails = styled.div`
    padding-left: 24em;
`



let username = '';
let boardId = null;
let teamMember, boardOwner;
let teamOwner, teamName;
let avatarUrl = 'https://api.adorable.io/avatars/285/';
let toLogin = false;

function Dashboard() {
    
    useEffect(() => {
      checkUser()
    }, []);

    const [user, setUser] = useState({});

    let result;

    const history = useHistory();

    let [hasBoard, setHasBoard] = useState(false);
    const [name, setName] = useState('');
    //const [boardId, setBoardId] = useState(null);
    const [toBoard, setToBoard] = useState(false);
    const [toTeam, setToTeam] = useState(false);
    const [toRequest, setToRequest] = useState(false);
    const [boardData, setBoardData] = useState(null);
    const [teamMember, setTeamMember] = useState(null);
    const [boardOwner, setBoardOwner] = useState(null);
    const [nameOfTeam, setNameOfTeam] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [toCreateBoard, setToCreateBoard] = useState(false);
    const [toCreateTeam, setToCreateTeam] = useState(false);
    //const [toLogin, setToLogin] = useState(false);

    async function checkUser() {
        let id;

        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { username: data.username, ...data.attributes, };
            username = userInfo['username'];
            
            loadAvatar();
            setUser(userInfo)
            result = await Auth.currentUserInfo();

            //Testing 
            await axios.post('http://localhost:8080/api/users/member', {
                username: username,
            })
            .then(response => {
                setHasBoard(response.data);
            });

            await axios.post('http://localhost:8080/api/users/board-id', {
                username: username,
            })
            .then(response => {
                //setBoardId(response.data);
                id = parseInt(response.data);
                boardId = id;
            })

            loadTeam();
            //setHasBoard(result.attributes['custom:hasBoard']);
            //setBoardId(result.attributes['custom:boardId']);
            
            //let id = result.attributes['custom:boardId'];
            //id = parseInt(id);
            //boardId = id;
            //console.log("BoardID:::", typeof id);
            
            //Retrieve the board name
            if ({hasBoard}) {
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/boards/name',
                    data: {
                        boardId: id,
                    }
                }).then((response) => {
                    setName(response.data);
                    checkTeam();
                    setIsLoading(false);
                });
            }
        } 
        catch (err) {
            //If the user is not logged in
            if (err === 'No current user') {
                history.push('/login');
                
            } 
            console.log('error: ', err); 
        }
    }

    function loadAvatar() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/avatar',
            data: {
                username: username,
            }
        }).then(response => {
            avatarUrl = avatarUrl + response.data;
        })
    }

    function loadTeam() {
        //Check if the user is a board owner
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/board-owner',
            data: {
                username: username,
            }
        }).then((response) => {
            //boardOwner = response.data;

            //Testing New
            setBoardOwner(response.data);

            //Check if the user is a team member
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/users/team-member',
                data: {
                    username: username,
                }
            }).then((response) => {
                setTeamMember(response.data);

                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/users/team-name',
                    data: {
                        username: username,
                    }
                }).then(response => {
                    setNameOfTeam(response.data);
                })
            });

        });
    }

    async function checkTeam() {
        await axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/team-member',
            data: {
                username: username,
            }
        }).then((response) => {
            setTeamMember(response.data);
        });
    }

    function createNewBoard() {
        history.push('/board-create', { owner: username });
    }

    /* function createNewTeam() {

        history.push('/team-create', { currentUser: username });
    } */

    function viewMyTeam() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users/team-owner',
            data: {
                username: username,
            }
        }).then((response) => {
            teamOwner = response.data;

            axios({
                method: 'post',
                url: 'http://localhost:8080/api/users/team-name',
                data: {
                    username: username,
                }
            }).then((response) => {
                teamName = response.data;
                setToTeam(true);
            })
        });
    }

    async function getBoardData() {
        await axios.post('http://localhost:8080/api/boards/get', {
            boardId: boardId,
        })
        .then(response => {
            setBoardData(response.data);
            setToBoard(true);
        })    
    }

    function joinTeam() {
        setToRequest(true);
    }

    function closeTeamRequest() {
        setToRequest(false);
    }

    function closeCreateBoard() {
        setToCreateBoard(false);
    }

    function closeCreateTeam() {
        setToCreateTeam(false);
    }

    if (isLoading) {
        return(
            <Container>
                <CircularProgress />
            </Container>
        )
    }

    if (toLogin) {
        return (
            <Redirect to={{
                pathname: '/login',
            }} />
        );
    }

    //Redirect to /board
    if (toBoard === true) {
        return(
            <Redirect to={{
                pathname: '/board',
                state: { dataSent: boardData }
                }} 
            />
        )
    }

    //Redirect to /team
    if (toTeam === true) {
        return (
            <TeamStage teamName={teamName} teamOwner={teamOwner} currentUser={username} />
        )
    }

    //Redirect to /team-request
   /*  if (toRequest === true) {
        return (
            <TeamRequest username={username} avatar={avatarUrl} />
        )
    } */

    return (    
             <div>
                    {toRequest && (
                        <TeamRequest username={username} avatar={avatarUrl} closeModal={closeTeamRequest}/>
                    )}
                    {toCreateBoard && (
                        <CreateBoard owner={username} closeModal={closeCreateBoard} />
                    )}
                    {toCreateTeam && (
                        <CreateTeam currentUser={username} closeModal={closeCreateTeam} />
                    )}
                    <Row>
                            <TopAppBar />
                    </Row>
            <Row>
                <Column size={1}>
                    <HeadingText>Your Dashboard</HeadingText>
                </Column>
            </Row>
            <AccountDetails>               
                <SubHeadingText>Account details</SubHeadingText>
                <Row>
                    <Column>
                        <DetailText>Avatar: </DetailText>
                    </Column>
                    <Column>
                        <AvatarCol>
                            <Avatar src={avatarUrl} />
                        </AvatarCol>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <DetailText>Username: </DetailText>
                    </Column>
                    <Column>
                        <UsernameText>{user.username}</UsernameText>
                    </Column>
                </Row>
                <SubHeadingText>Your Boards</SubHeadingText>
                {hasBoard === true && (
                    <Column>
                        <BoardText>{name}</BoardText>
                            <BoardButton>
                                <Button appearance="primary" onClick={() => getBoardData()} >View Board</Button>
                            </BoardButton>
                    </Column>                        
                )}
                {/* If the user has not created a Board or has not joined a Team*/}
                {hasBoard === false && (
                    <Column>
                        <NoBoardText>You haven't created any boards</NoBoardText>
                        <BoardButton>
                            <Button appearance="primary" onClick={() => setToCreateBoard(true)}>Create new board</Button>
                        </BoardButton>    
                    </Column>    
                )}
                <SubHeadingText>Your Team</SubHeadingText>
                    {
                        (() => {
                            if (boardOwner === true && teamMember === false) {
                                return (
                                    <Column>
                                        <NoTeamText>You haven't created any teams</NoTeamText>
                                        <TeamButton>
                                            <Button appearance="primary" onClick={() => setToCreateTeam(true)}>Start a Team</Button>
                                        </TeamButton>
                                    </Column>
                                );
                            }
                            else if (boardOwner === true && teamMember === true) {
                                return (
                                    <Column>
                                        <TeamText>{nameOfTeam}</TeamText>
                                        <TeamButton>
                                            <Button appearance="primary" onClick={() => viewMyTeam()}>View My Team</Button>
                                        </TeamButton>
                                    </Column>
                                );
                            }
                            else if (boardOwner === false && teamMember === true) {
                                return (
                                    <Column>
                                        <TeamText>{nameOfTeam}</TeamText>
                                        <TeamButton>
                                            <Button appearance="primary" onClick={() => viewMyTeam()}>View My Team</Button>
                                        </TeamButton>
                                    </Column>
                                );
                            }
                            else if (boardOwner === false && teamMember === false) {
                                return (
                                    <Column>
                                        <NoTeamText>Join a team created by another user</NoTeamText>
                                        <TeamButton>
                                            <Button appearance="primary" onClick={() => joinTeam()}>Join a Team</Button>
                                        </TeamButton>
                                    </Column>
                                );
                            }
                        })()
                    }
            </AccountDetails>
        </div>
    );
}
  
  export default Dashboard
  //export default withAuthenticator(Dashboard)