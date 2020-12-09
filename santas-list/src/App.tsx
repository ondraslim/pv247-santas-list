import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";


import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Hidden from '@material-ui/core/Hidden';

import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css';

import Lists from "./pages/Lists";
import { useLoggedInUser } from "./utils/firebase";

import UserContext from "./context/UserContext";
import MenuDrawerLeft from "./components/MenuDrawerLeft";
import BasicMenu from "./components/BasicMenu";




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

    // Login state
    const user = useLoggedInUser();

    return (
        <MuiThemeProvider theme={ourTheme}>
            <UserContext.Provider value={{ user }}>
                <Router>
                    <Hidden xsDown>
                        <BasicMenu/>
                    </Hidden>
                    <Hidden smUp>
                        <MenuDrawerLeft/>
                    </Hidden>

                    {user === null && <Redirect to='/login' />}

                    <main className="App">
                        <Container maxWidth="lg">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login/" component={Login} />
                                <Route exact path="/about/" component={About} />
                                <Route exact path="/list/" component={Lists} />
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