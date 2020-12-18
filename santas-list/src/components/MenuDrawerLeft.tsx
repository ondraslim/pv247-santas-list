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
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InfoIcon from '@material-ui/icons/Info';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';




const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: red[900],
        fontSize: '20',
    },

    title: {
        flexGrow: 1,
    },

    button: {
        borderRadius: '2px',
        backgroundColor: 'darkgrey',
        '&:hover': {
            backgroundColor: 'white',
        }
    },

    list: {
        backgroundColor: 'white',
        borderStyle: 'none',
        boxShadow: 'none',
    }

});


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
                <List className={classes.list}>
                    {user && <>
                        <ListItem alignItems='flex-start'>
                            <Button disabled style={{ color: "darkgrey" }}>
                                {user.email}
                            </Button>
                        </ListItem>
                        <Divider />
                        <ListItem divider alignItems='center'>
                            <ListItemIcon> <HomeIcon /></ListItemIcon>
                            <Link className={classes.link} to="/" onClick={handleDrawerClose}><b>Home</b></Link>

                        </ListItem>
                        <ListItem divider>
                            <ListItemIcon> <InfoIcon /> </ListItemIcon>
                            <Link className={classes.link} to="/about/" onClick={handleDrawerClose}><b>About</b></Link>

                        </ListItem>
                        <ListItem >
                            <ListItemIcon> <CardGiftcardIcon></CardGiftcardIcon>  </ListItemIcon>
                            <Link className={classes.link} to="/list/" onClick={handleDrawerClose} ><b>Gift Lists</b></Link>

                        </ListItem>
                        <Divider />
                        <Divider />
                        <ListItem >
                            <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                            <Link className={classes.link} to="/login/" onClick={() => { handleDrawerClose(); signOut() }}><b>Logout</b></Link>

                        </ListItem>
                        <Divider />
                    </>}
                    {user == null && <>
                        <ListItem divider>
                            <ListItemIcon> <InfoIcon /> </ListItemIcon>
                            <Link className={classes.link} to="/about/" onClick={handleDrawerClose}><b>About</b></Link>

                        </ListItem>
                        <Divider />
                        <ListItem  divider>
                            <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                            <Link className={classes.link} to="/login/" onClick={handleDrawerClose}><b>Login</b></Link>

                        </ListItem>
                        <ListItem divider>
                            <ListItemIcon> <PersonAddIcon /> </ListItemIcon>
                            <Link className={classes.link} to="/register/" onClick={handleDrawerClose}><b>Register</b></Link>
                        </ListItem>
                    </>}
                </List>
            </Drawer>
        </div>

    );

};

export default MenuDrawerLeft;