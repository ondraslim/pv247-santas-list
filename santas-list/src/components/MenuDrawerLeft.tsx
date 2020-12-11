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




const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

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
        backgroundColor: 'lightgrey',
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
                        <ListItemIcon> <HomeIcon/></ListItemIcon>
                                <Link className={classes.link} to="/"><b>Home</b></Link>
                            
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose} divider>
                            <ListItemIcon> <InfoIcon/> </ListItemIcon>
                                <Link className={classes.link} to="/about/"><b>About</b></Link>
                            
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemIcon> <CardGiftcardIcon></CardGiftcardIcon>  </ListItemIcon>
                                <Link className={classes.link} to="/list/"><b>Gift Lists</b></Link>
                        
                        </ListItem>
                        <Divider />
                        <Divider />
                        <ListItem button onClick={() => { handleDrawerClose(); signOut() }}>
                            <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                                <Link className={classes.link} to="/login/"><b>Logout</b></Link>
                            
                        </ListItem>
                        <Divider />
                    </>}
                    {user == null && <>
                        <ListItem button divider>
                            <ListItemIcon> <InfoIcon/> </ListItemIcon>
                                <Link className={classes.link} to="/about/" onClick={handleDrawerClose}><b>About</b></Link>
                            
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleDrawerClose} divider>
                            <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                                <Link className={classes.link} to="/login/"><b>Login</b></Link>
                        
                        </ListItem>
                        <ListItem button onClick={handleDrawerClose} divider>
                            <ListItemIcon> <PersonAddIcon /> </ListItemIcon>
                                <Link className={classes.link} to="/register/"><b>Register</b></Link>
                            
                        </ListItem>
                    </>}
                </List>
            </Drawer>
        </div>

    );

};

export default MenuDrawerLeft;