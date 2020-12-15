import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import icon from './insightsIcon.png';
import green from '@material-ui/core/colors/green';

import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, listStats, getLists } from "../utils/firebase"
import UserContext from "../context/UserContext"
import { GiftListStats, UserStats, GiftList } from "../data/DataTypes"
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    app: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        margin: '1px',
    },

    grid: {
        flex: 'auto',
    },

    card: {
        boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
    },

    media: {
        height: '25vh'
    },

    listItem: {
        '&:hover': {
            backgroundColor: green[100],
        }
    },

    list: {
        borderStyle: 'none',
    },

    formControl: {
        minWidth: '130px',
    },

}));


const Home: FC = () => {
    const classes = useStyles();
    const [userStats, setUserStats] = useState<UserStats>({ giftListCount: -1, gifteeCount: -1 })
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({ gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: -1 });
    const [chosenList, setChosenList] = useState<string>("");
    const { user } = useContext(UserContext);
    const [giftLists, setGiftLists] = useState<GiftList[]>([]);

    useMemo(() => {
        if (user?.email) {
            statsForUser(user).then(val => {
                setUserStats(val)
            })
            getLists(user).then(val => {
                setGiftLists(val);
            })
        }
    }, [user])

    useMemo(() => {
        if (user?.email) {
            listStats(chosenList, user).then(val => {
                setGiftListStats(val);
            })

        }
    }, [chosenList, user])

    function giftListNames() {
        let tempNames: string[] = [];
        tempNames.push("");
        giftLists.forEach(list => {
            tempNames.push(list.name);
        })

        return tempNames;
    };

    return (
        <div className="App">
            {(user === undefined || userStats.gifteeCount === -1) ? (
                <Grid container direction="column" style={{ margin: '5px' }}>
                    <Grid item xs={12}>
                        <Typography align="center" color='primary' variant="h5">
                            <CircularProgress /> Loading...
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                    <Grid container direction="column" style={{ margin: '5px' }}>
                        <Grid item xs={12}>
                            <Typography align="center" color='primary' variant="h4">
                                Welcome<Hidden xsDown>, {user?.email}</Hidden> !
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} className={classes.app}>
                                <Grid item xs={12} container>
                                    <Grid item xs container direction="row" spacing={3}>
                                        <Grid item className={classes.grid}>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item>
                                                    <Card style={{ minHeight: '30vh' }} className={classes.card}>
                                                        <CardContent>
                                                            <Grid container spacing={2} alignItems="center">
                                                                <Grid item xs={12} md={8} sm={8}>
                                                                    <Typography variant='h5' color="secondary">
                                                                        <i>Check your overall statistics!</i>
                                                                    </Typography>
                                                                    <List className={classes.list}>
                                                                        <ListItem className={classes.listItem}>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <ShowChartIcon />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Number of gist lists" secondary={userStats.giftListCount} />
                                                                        </ListItem>
                                                                        <ListItem className={classes.listItem}>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <PeopleIcon />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Number of giftees" secondary={userStats.gifteeCount} />
                                                                        </ListItem>
                                                                    </List>
                                                                </Grid>
                                                                <Hidden xsDown>
                                                                    <Grid item md={4} sm={4}>
                                                                        <CardMedia image={icon} className={classes.media}>
                                                                        </CardMedia>
                                                                    </Grid>
                                                                </Hidden>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item>
                                                    <Card style={{ minHeight: '40vh' }} className={classes.card}>
                                                        <CardContent>
                                                            <Grid container >
                                                                <Grid item xs={12}>
                                                                    <Grid container direction="row" >
                                                                        <Grid item xs={6} sm={6} md={6}>
                                                                            <Typography variant='h5' color="secondary">
                                                                                <i>Check your stats for chosen giftlist!</i>
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={8} md={4} sm={4}>
                                                                            <FormControl className={classes.formControl}>
                                                                                <InputLabel>Choose giftlist</InputLabel>
                                                                                <Select
                                                                                    value={chosenList}
                                                                                    onChange={e => setChosenList(e.target.value as string)}
                                                                                    input={<Input />}
                                                                                >
                                                                                    { /*{giftListNames().map((name) => (
                                                                                        <option key={name} value={name}>
                                                                                            {name}
                                                                                        </option>
                                                                                    ))} */}
                                                                                    {giftListNames().map((name) => (
                                                                                        <MenuItem key={name} value={name} style={{ height: '35px' }}>
                                                                                            {name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {(chosenList !== '') && <>
                                                                    <Grid item xs={12}>
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={6} md={6} sm={6}>
                                                                                <Grid container direction="column">
                                                                                    <Grid item>
                                                                                        <List className={classes.list}>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PeopleIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Number of giftees" secondary={giftListStats.gifteeCount} />
                                                                                            </ListItem>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PersonIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Low-budget giftee" secondary={giftListStats.minName} />
                                                                                            </ListItem>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <ShowChartIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="The lowest budget" secondary={giftListStats.gifteeCount === 0 ? 0 : giftListStats.minCount} />
                                                                                            </ListItem>
                                                                                        </List>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item xs={6} md={6} sm={6}>
                                                                                <Grid container direction="column">
                                                                                    <Grid item>
                                                                                        <List className={classes.list}>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <ShowChartIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Average budget" secondary={giftListStats.avgCount} />
                                                                                            </ListItem>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PersonIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Big-budget giftee" secondary={giftListStats.maxName} />
                                                                                            </ListItem>
                                                                                            <ListItem className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <ShowChartIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="The highest budget" secondary={giftListStats.maxCount} />
                                                                                            </ListItem>
                                                                                        </List>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </>}
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/*<Hidden smDown>
                                            <Grid item className={classes.grid} lg={4} xs={4}>
                                                <Card style={{ backgroundColor: 'blue', minHeight: '70vh' }} className={classes.card}>
                                                    <CardContent>
                                                        <CardMedia image='./tree.png' className={classes.media}>
                                                        </CardMedia>

                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Hidden>*/}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </div >
    );
};

export default Home;