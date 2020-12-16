import React, { FC, useContext,} from "react";
import {
    Link,
} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import UserContext from "../context/UserContext";
import { signOut } from "../utils/firebase";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },

    link: {
        textDecoration: "none",
        color: "white",
    },
}));

const BasicMenu: FC = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                            <Link className={classes.link} to="/list/"><b>Gift Lists</b></Link>
                        </Button>
                        <Box display="flex"
                            m='auto'
                            alignItems="center"
                            justifyContent="center">
                            <Typography variant="h4">
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

    );

};

export default BasicMenu;