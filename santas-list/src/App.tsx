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

import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css';
import GiftLists from "./pages/GiftLists";


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
    const [auth, setAuth] = React.useState(true);

    const handleLogout = () => {
        setAuth(false);
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
                                <Box display="flex"
                                    m='auto'
                                    alignItems="center"
                                    justifyContent="center">
                                    <Typography variant="h5">
                                        Santa's list
                                </Typography>
                                </Box>
                            </Box>
                            <Button className={classes.menuButton} onClick={handleLogout}>
                                <Link className={classes.link} to="/"><b>Logout</b></Link>
                            </Button>
                        </>}

                        {auth === false && <>
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
        </MuiThemeProvider>
    );
}

export default App;