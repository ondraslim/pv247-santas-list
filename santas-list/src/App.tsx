import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";


import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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


const ourTheme = createMuiTheme({
    palette: {
        primary: {
            main: red[900],
        },

        secondary: {
            main: green[900],
        },
    },
    overrides: {
        MuiButton: {
            root: {
                '&:hover': {
                    backgroundColor: red[600],
                }
            },
            containedPrimary: {
                '&:hover': {
                    backgroundColor: red[600],
                }
            }
        },
        MuiCard: {
            root: {
                height: "100%",
                width: "100%",
                borderStyle: "solid",
                borderWidth: "medium",
                borderColor: green[900],
                backgroundColor: green[50],
                boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
            }
        },
        MuiCardHeader: {
            root: {
                backgroundColor: green[200],
                color: 'black',
            }
        },
        MuiList: {
            root: {                
                backgroundColor:green[50],
                borderWidth: 'medium',
                borderStyle: 'solid',
                borderColor: green[900],
                boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
            }
        },
        MuiListItem: {
            root: {
                '&:hover': {
                    backgroundColor: green[100],
                }
            }
        },
        MuiTypography: {
            h3: {
                fontSize: '2.8rem',
                textDecoration: 'underline',
                textDecorationColor: green[900],
                color:  red[900],
            },
            h4: {
                fontSize: '1.6rem',                
            },
            h5: {
                fontSize: '1.6rem',
                color: green[900],
                fontStyle: "italic",
            }
        },
        MuiGrid: {
            root: {
                flex: 'auto',                
            }
        },
        MuiFormControl: {
            root: {
                minWidth: '130px',
            }
        },
        MuiCardMedia: {
            root: {
                height: '25vh',
            }
        }
    },
    
});


function App() {

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

                    {user === null && <Redirect to='/about' />}

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