import React, { FC, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    Link,
    Redirect,
} from "react-router-dom";

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { signUp,} from '../utils/firebase';
import UserContext from '../context/UserContext';

const useStyles = makeStyles({
    app: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',

    },
    card: {
        boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
        maxWidth: '50vw'
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
    // Since firebase returns informative error messages we can show them directly
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    // Since firebase returns informative error messages we can show them directly
    const [error, setError] = useState<string>();
  
    const isLoggedIn = user !== null;
  
    if (isLoggedIn) {
      return <Redirect to='/' />;
    }

    const register = async (): Promise<void> => {
        try {
            await signUp(email, password);
          } catch (err) {
            setError(err.message);
          }
    };

    return (
        <Grid container className={classes.app}>
            <Card className={classes.card}>
                <CardContent>
                    <PersonAddIcon style={{ fontSize: '60'}}/>
                    <Typography variant='h5' component='h1'>
                        Register
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                    <TextField
                        label='Confirm password'
                        type='password'
                        name='password'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        color="secondary"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {error && (
                        <Typography variant='subtitle2' align='left' color='error' paragraph>
                            <b>{error}</b>
                        </Typography>
                    )}
                    <Typography variant='subtitle2' align='left' paragraph>
                        Already registered?{' '}
                        <Link to="/login/">Sign in</Link>
                    </Typography>
                </CardContent>
                <CardActions className={classes.text}>
                    <Button
                        className={classes.button}
                        variant='contained'
                        size='large'
                        color='primary'
                        onClick={() => { 
                            password === confirmPassword ? register() : setError("Passwords do not match");
                         }
                        }
                    >
                        Register
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    );
};

export default Login;
