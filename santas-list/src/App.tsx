import React, { FC, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from "react-router-dom";


import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import List from "./pages/List";
import Register from "./pages/Register";
import './App.css';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

    link: {
        textDecoration: "none",
        color: "white",
    },

}));

const ourTheme = createMuiTheme({
    palette: {
        primary: {
            main: red[700],
        },

        secondary: {
            main: green[900],
        },
    }
});


function App() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);


    /*const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    /*const handleClose = () => {
        setAnchorEl(null);
    };

        const handleProfile = () => {
        //Handle profile? 
        setAnchorEl(null);

    };*/

    const handleLogout = () => {
        setAuth(false);
        //setAnchorEl(null);
    };


    return (
        <MuiThemeProvider theme={ourTheme}>
            <Router>
                <AppBar color="primary" position="static" variant="outlined">
                    <Toolbar>
                        <Button className={classes.menuButton}>
                            <Link className={classes.link} to="/"><b>Home</b></Link>
                        </Button>
                        <Button className={classes.menuButton}>
                            <Link className={classes.link} to="/about/"><b>About</b></Link>
                        </Button>
                        {auth && <>
                            <Box display='flex' flexGrow={1}>
                                <Button className={classes.menuButton}>
                                    <Link className={classes.link} to="/list/"><b>List</b></Link>
                                </Button>
                                {/* <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
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
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}> Logout</MenuItem>
                            </Menu>*/}
                            </Box>
                            <Button className={classes.menuButton} onClick={handleLogout}>
                                <Link className={classes.link} to="/"><b>Logout</b></Link>
                            </Button>
                        </>}

                        {auth === false && <>
                            <Box display='flex' flexGrow={1}/>
                            <Button className={classes.menuButton}>
                                <Link className={classes.link} to="/login/"><b>Login</b></Link>
                            </Button>
                            <Button className={classes.menuButton}>
                                <Link className={classes.link} to="/register/"><b>Register</b></Link>
                            </Button>
                        </>}
                    </Toolbar>
                </AppBar>

                <main className="App">
                    <Container maxWidth="sm">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login/" component={Login} />
                            <Route exact path="/about/" component={About} />
                            <Route exact path="/list/" component={List} />
                            <Route exact path="/register/" component={Register} />
                        </Switch>
                    </Container>
                </main>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
