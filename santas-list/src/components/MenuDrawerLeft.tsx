import React, { FC, useContext, useState } from 'react';
import {
    Link,
} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import UserContext from '../context/UserContext';
import { signOut } from '../utils/firebase';



const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

    link: {
        textDecoration: "none",
        color: red[900],
    },

    title: {
        flexGrow: 1,
    },

    button: {
        borderRadius: '2px',
    },

    list: {
        backgroundColor: 'primary',
        color: 'green',
    }

}));


const MenuDrawerLeft: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap>
                        Santa's list
            </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >

                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {user && <>
                        <ListItem alignItems='flex-start'>
                            <Button disabled style={{ color: "darkgrey" }}>
                                {user.email}
                            </Button>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleDrawerClose} divider alignItems='center'>
                            <Button fullWidth>
                                <Link className={classes.link} to="/"><b>Home</b></Link>
                            </Button>
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose} divider>
                            <Button fullWidth>
                                <Link className={classes.link} to="/about/"><b>About</b></Link>
                            </Button>
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose}>
                            <Button fullWidth>
                                <Link className={classes.link} to="/list/"><b>Gift Lists</b></Link>
                            </Button>
                        </ListItem>
                        <Divider />
                        <Divider />
                        <ListItem button onClick={() => { handleDrawerClose(); signOut() }}>
                            <Button fullWidth>
                                <Link className={classes.link} to="/login/"><b>Logout</b></Link>
                            </Button>
                        </ListItem>
                        <Divider />
                    </>}
                    {user == null && <>
                        <ListItem button key={-1} onClick={handleDrawerClose} divider>
                            <Button fullWidth>
                                <Link className={classes.link} to="/about/"><b>About</b></Link>
                            </Button>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleDrawerClose} divider>
                            <Button fullWidth>
                                <Link className={classes.link} to="/login/"><b>Login</b></Link>
                            </Button>
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose} divider>
                            <Button fullWidth>
                                <Link className={classes.link} to="/register/"><b>Register</b></Link>
                            </Button>
                        </ListItem>
                    </>}
                </List>
            </Drawer>
        </div>

    );

};

export default MenuDrawerLeft;