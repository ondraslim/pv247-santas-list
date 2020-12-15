import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import tree from './tree.png';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import icon from './insightsIcon.png';

import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, listStats, setGiftee, setGiftList, getLists } from "../utils/firebase"
import UserContext from "../context/UserContext"
import { GiftListStats, UserStats, Gift, Giftee, GiftList } from "../data/DataTypes"
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
        backgroundColor: 'WhiteSmoke',
    },

    media: {
        height: '25vh'
    },

    listItem: {
        backgroundColor: 'primary',
    },

    formControl: {
        minWidth: '130px',
    },

}));


const Home: FC = () => {
    const classes = useStyles();
    const [userStats, setUserStats] = useState<UserStats>({ giftListCount: -1, gifteeCount: -1 })
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({ gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: 0 });
    const [chosenList, setChosenList] = useState<string>("");
    const { user } = useContext(UserContext);
    const [giftLists, setGiftLists] = useState<GiftList[]>([]);

    const g: Gift = { id: "1", name: "test gift", url: "testURL", price: 0 }
    const gft: Giftee = { id: "1", name: "test person", note: "test note", budget: 10, gifts: [] }
    const l: GiftList = { id: "1", name: "test gift list", user: "maryjane@santa.com", recipients: [gft] }


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
            setGiftee(chosenList, gft, user);
            //setGift(chosenList, "test", g, user);
            setGiftList(l);
        }
    }, [user, chosenList])

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
                            Loading...
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
                                                                    <List>
                                                                        <ListItem button className={classes.listItem}>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <ShowChartIcon />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Number of gist lists" secondary={userStats.giftListCount} />
                                                                        </ListItem>
                                                                        <ListItem button className={classes.listItem}>
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
                                                                                        <List>
                                                                                            <ListItem button className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PeopleIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Number of giftees" secondary={giftListStats.gifteeCount} />
                                                                                            </ListItem>
                                                                                            <ListItem button className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PersonIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Low-budget giftee" secondary={giftListStats.minName} />
                                                                                            </ListItem>
                                                                                            <ListItem button className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <ShowChartIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="The lowest budget" secondary={giftListStats.minCount} />
                                                                                            </ListItem>
                                                                                        </List>
                                                                                    </Grid>
                                                                                </Grid>

                                                                            </Grid>
                                                                            <Grid item xs={6} md={6} sm={6}>
                                                                                <Grid container direction="column">
                                                                                    <Grid item>
                                                                                        <List>
                                                                                            <ListItem button className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <ShowChartIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Average budget" secondary={giftListStats.avgCount} />
                                                                                            </ListItem>
                                                                                            <ListItem button className={classes.listItem}>
                                                                                                <Hidden only={'xs'}>
                                                                                                    <ListItemAvatar>
                                                                                                        <Avatar>
                                                                                                            <PersonIcon />
                                                                                                        </Avatar>
                                                                                                    </ListItemAvatar>
                                                                                                </Hidden>
                                                                                                <ListItemText primary="Big-budget giftee" secondary={giftListStats.maxName} />
                                                                                            </ListItem>
                                                                                            <ListItem button className={classes.listItem}>
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
                                                                </> }
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
        /* <p>
            
        Nr. of lists: { userStats.giftListCount } and nr. of giftees on them: { userStats.gifteeCount }
        <br />
        Chosen list: { chosenList } and nr. of people on chosen list: { giftListStats.gifteeCount } and min budget for this list: { giftListStats.minCount } for { giftListStats.minName } and max: { giftListStats.maxCount } for { giftListStats.maxName }. Average budget: { giftListStats.avgCount }.
        <br />
        Gift { g.name } added via method
        <br />
        Giftee { gft.name } added via method 
        <br />
        Gift list { l.name } added via method
        <br />
        { giftLists[1]?.name }, { giftLists[0]?.user }
       </p> */
    );
};

export default Home;