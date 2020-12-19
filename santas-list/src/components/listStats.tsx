import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import React, { FC, useState, useMemo, useContext } from "react";
import { GiftListStats, GiftList } from "../data/DataTypes"
import { listStats } from "../utils/firebase";
import UserContext from "../context/UserContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({

    card: {
        borderWidth: '1px',
    },

    list: {
        borderStyle: 'none',
        boxShadow: 'none',
    },
});

type Props = {
    giftLists: GiftList[];
};

const ListStatsBox: FC<Props> = ({ giftLists }) => {
    const [chosenList, setChosenList] = useState<string>("");
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({ gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: -1 });

    const { user } = useContext(UserContext);
    const { t } = useTranslation();

    const classes = useStyles();

    useMemo(() => {
        setGiftListStats({ gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: -1 });
        if (user?.email) {
            listStats(chosenList, user).then(val => {
                setGiftListStats(val);
            })

        }
    }, [chosenList, user])

    function giftListNames() {
        let tempNames: string[] = [];
        giftLists.forEach(list => {
            tempNames.push(list.name);
        })

        if (tempNames.length === 0) {
            tempNames.push("");
        }
        return tempNames;
    };

    return (
        <Card style={{ minHeight: '40vh' }} className={classes.card}>
            <CardContent>
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container direction="row" >
                            <Grid item xs={6} sm={6} md={6}>
                                <Typography variant='h5'>
                                    {t('listStats.description')}
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={4} sm={4}>
                                <FormControl>
                                    <InputLabel>{t('listStats.select_list')}</InputLabel>
                                    <Select value={chosenList}
                                        onChange={e => setChosenList(e.target.value as string)}
                                        input={<Input />}>
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
                            {(giftListStats.gifteeCount === -1) ? (
                                <Typography align="center" color='primary' variant="h5">
                                    <CircularProgress /> {t('listStats.loading')}
                                </Typography>
                            ) : (
                                    <Grid container direction="row">
                                        <Grid item xs={6} md={6} sm={6}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <List className={classes.list}>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <PeopleIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.giftees_count')} secondary={giftListStats.gifteeCount} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <PersonIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.low_budget_giftee')} secondary={giftListStats.minName} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ShowChartIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.lowest_budget_giftee')} secondary={giftListStats.gifteeCount === 0 ? 0 : giftListStats.minCount} />
                                                        </ListItem>
                                                    </List>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={6} sm={6}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <List className={classes.list}>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ShowChartIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.avg_budget')} secondary={giftListStats.avgCount} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <PersonIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.big_budget_giftee')} secondary={giftListStats.maxName} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <Hidden only={'xs'}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ShowChartIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                            </Hidden>
                                                            <ListItemText primary={t('listStats.highest_budget_giftee')} secondary={giftListStats.maxCount} />
                                                        </ListItem>
                                                    </List>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>)}
                        </Grid>
                    </>}
                </Grid>
            </CardContent>
        </Card>)
};

export default ListStatsBox;