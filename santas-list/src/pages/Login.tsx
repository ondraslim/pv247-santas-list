import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from "react-router-dom";

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { signIn, signUp, useLoggedInUser } from '../utils/firebase';

const useStyles = makeStyles({
    app: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',

    },
    card: {
        boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
        maxWidth: '50vw',
    },

    text: {
        alignContent: 'left',
    },

    button: {
        borderRadius: '12px',
        flex: '1',
    
    }
});

const Login: FC = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    // Since firebase returns informative error messages we can show them directly
    const [error, setError] = useState<string>();
    const classes = useStyles();

    const isLoggedIn = useLoggedInUser();

    if (isLoggedIn) {
        return <Redirect to='/' />;
    }

    return (
        <Grid container className={classes.app}>
            <Card className={classes.card}>
                <CardContent>
                    <AccountBoxIcon style={{ fontSize: '60' }}/>
                    <Typography variant='h5' component='h1'>
                        Sign in
                    </Typography>
                    <TextField
                        label='Email'
                        type='email'
                        name='email'
                        fullWidth
                        autoComplete='email'
                        margin='normal'
                        variant='outlined'
                        color="secondary"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        color="secondary"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography variant='subtitle2' align='left' color='error' paragraph>
                            <b>{error}</b>
                        </Typography>
                    )}
                    <Typography variant='subtitle2' align='left' paragraph>
                        New user?{' '}
                        <Link to="/register/">Register here</Link>
                    </Typography>
                </CardContent>
                <CardActions className={classes.text}>
                    <Button
                        className={classes.button}
                        variant='contained'
                        size='large'
                        color='primary'
                        onClick={() => { console.log("Login"); }
                        }
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Login;
