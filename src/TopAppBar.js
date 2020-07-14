import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

import { useHistory, Redirect, Route } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import Api from './api-config';

import Dashboard from './Issue/Dashboard';
import Login from './Login';
import GetBoardData from './Board/GetBoardData';

import axios from 'axios';

import Avatar from '@atlaskit/avatar';

import styled from 'styled-components';

import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    drawer: {
        backgroundColor: "#0052CC",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolBar: {
      backgroundColor: '#0052CC',
    },
    loginButton: {
      left: "85%",
    },
    avatar: {
        paddingLeft: "65em",
    },
}));

const Title = styled.h3`
    :hover {
        cursor: pointer;
    }
`


const history = createHistory();
let username = null;
const avatarUrl = 'https://api.adorable.io/avatars/285/';
let finalAvatar = '';
let hasBoard = null;

export default function TopAppBar() {

    useEffect(() => {
        checkUser()
      }, []);
  
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [toDashboard, setToDashboard] = useState(false);
    const [toBoard, setToBoard] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [toLogin, setToLogin] = useState(false);
    const [toLogout, setToLogout] = useState(false);
    const [toTeam, setToTeam] = useState(false);
    const [toHome, setToHome] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [avatar, setAvatar] = useState('');

    const open = Boolean(anchorEl);

    async function checkUser() {
        try{
            const data = await Auth.currentUserPoolUser()
            const userInfo = { username: data.username, ...data.attributes, }
            username = userInfo['username'];
            hasBoard = userInfo['custom:hasBoard'];
            loadAvatar(username);

            if (username != null) {
                setSignedIn(true);
            }
            
        }
        catch{

        }
    }

    async function loadAvatar(username) {
        await axios({
            method: 'post',
            url: Api.domain + 'users/avatar',
            data: {
                username: username,
            }
        }).then(response => {
            setAvatar(avatarUrl + response.data);
            finalAvatar = avatarUrl + response.data;
        });
    }
    

    const toggleDrawer = isOpen => {
      setDrawerOpen(isOpen);
    }

    const handleAvatarMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    if (toLogin) {
        if (window.location.pathname === '/login') {
            history.go(0);
        }
        else{
            return (
                <Redirect to={{
                    pathname: '/login',
                }} />
            );
        }
    }

    if (toLogout) {
        return (
            
            <Redirect to={{
                pathname: '/logout',
            }} />
        );
    }

    if (toDashboard) {
        if (window.location.pathname === '/dashboard') {
            history.go(0);
        }
        else {
            return (
                <Redirect to={{
                    pathname: '/dashboard',
                }} />
            );
        }
    }

    if (toBoard) {

      if (window.location.pathname === '/board') {
        history.go(0);
      }
      else {

        return (
          <Redirect to={{
            pathname: '/board',
            }} 
          />
          );
      }
    }

    if (toTeam) {

        if (window.location.pathname === '/team') {
            history.go(0);
        }
        else {
            return (
                <Redirect to={{
                    pathname: '/team',
                }} />
            );
        }
    }

    if (toHome) {

        if (window.location.pathname === '/') {
            history.go(0);
        }
        else {
            return (
                <Redirect to={{
                    pathname: '/',
                }} />
            );
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={ () => toggleDrawer(true) } />
                        <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                          <List>
                            <ListItem button disabled={!signedIn} onClick={() => setToDashboard(true)}>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button disabled={!hasBoard} onClick={() => setToBoard(true)}>
                              <ListItemIcon>
                                <CreateIcon />
                              </ListItemIcon>
                              <ListItemText primary="Board" />
                            </ListItem>
                            <ListItem button disabled={!hasBoard} onClick={() => setToTeam(true)}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Team" />
                            </ListItem>
                          </List>
                        </Drawer>
                    </IconButton>
                    <Title onClick={() => setToHome(true)}>CollaBoard</Title>
                    {!signedIn && (
                        <Button className={classes.loginButton} color="inherit" onClick={() => setToLogin(true)}>Login</Button>
                    )}
                    {signedIn && (
                        <div>
                            <IconButton 
                                className={classes.avatar}  
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleAvatarMenu}
                                color="inherit"
                            >
                                <Avatar src={avatar} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => setToLogout(true)}>Sign Out</MenuItem>
                                {/*<MenuItem onClick={handleClose}>My account</MenuItem> */}
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )


}