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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css';
import GiftLists from "./pages/GiftLists";
import { signOut, useLoggedInUser } from "./utils/firebase";
import UserContext from "./context/UserContext";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

    link: {
        textDecoration: "none",
        color: "white",
    },

    title: {
        flexGrow: 1,
    },

}));

const ourTheme = createMuiTheme({
    palette: {
        primary: {
            main: red[900],
        },

        secondary: {
            main: green[900],
        },
    },
});


function App() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Login state
    const user = useLoggedInUser();

    return (
        <MuiThemeProvider theme={ourTheme}>
            <UserContext.Provider value={{ user }}>
                <Router>
                    <AppBar color="primary" position="static" variant="outlined">
                        <Toolbar>
                            {user && <>
                                <Button className={classes.menuButton}>
                                    <Link className={classes.link} to="/"><b>Home</b></Link>
                                </Button>
                            </>}
                            <Button className={classes.menuButton}>
                                <Link className={classes.link} to="/about/"><b>About</b></Link>
                            </Button>

                            {user && <>
                                <Box display='flex' flexGrow={1}>
                                    <Button className={classes.menuButton}>
                                        <Link className={classes.link} to="/list/"><b>List</b></Link>
                                    </Button>
                                    <Box display="flex"
                                        m='auto'
                                        alignItems="center"
                                        justifyContent="center">
                                        <Typography variant="h5">
                                            Santa's list
                                </Typography>
                                    </Box>
                                </Box>
                                {/*<Button className={classes.menuButton} onClick={signOut}>
                                    <Link className={classes.link} to="/"><b>Logout</b></Link>
                            </Button>*/}
                                <IconButton
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
                                    <Button disabled style={{ color: "darkgrey" }}>
                                        {user.email}
                                    </Button>
                                    <Divider />
                                    <MenuItem onClick={() => { handleClose(); signOut() }}>Logout</MenuItem>
                                </Menu>
                            </>}

                            {user === null && <>
                                <Box display="flex"
                                    m='auto'
                                    alignItems="center"
                                    justifyContent="center">
                                    <Typography variant='h5'>
                                        Santa's list
                                </Typography>
                                </Box>
                                <Button className={classes.menuButton}>
                                    <Link className={classes.link} to="/login/"><b>Login</b></Link>
                                </Button>
                                <Button className={classes.menuButton}>
                                    <Link className={classes.link} to="/register/"><b>Register</b></Link>
                                </Button>

                            </>}
                        </Toolbar>
                    </AppBar>

                    {user === null && <Redirect to='/login' />}

                    <main className="App">
                        <Container maxWidth="lg">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login/" component={Login} />
                                <Route exact path="/about/" component={About} />
                                <Route exact path="/list/" component={GiftLists} />
                                <Route exact path="/register/" component={Register} />
                            </Switch>
                        </Container>
                    </main>
                </Router>
            </UserContext.Provider>
        </MuiThemeProvider>
    );
}

export default App;