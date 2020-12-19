import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import CardMedia from '@material-ui/core/CardMedia';
import icon from './insightsIcon.png';
import ListItemText from '@material-ui/core/ListItemText';

import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import React, { FC } from "react";
import { UserStats } from "../data/DataTypes"
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
    userStats: UserStats;
};


const UserStatsBox: FC<Props> = ({ userStats }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card style={{ minHeight: '30vh' }} className={classes.card}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8} sm={8}>
                        <Typography variant='h5'>
                            {t('userStats.description')}
                        </Typography>
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ShowChartIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('userStats.giftlists_count')} secondary={userStats.giftListCount} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PeopleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('userStats.giftees_count')} secondary={userStats.gifteeCount} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item md={4} sm={4}>
                            <CardMedia image={icon}>
                            </CardMedia>
                        </Grid>
                    </Hidden>
                </Grid>
            </CardContent>
        </Card>)
}

export default UserStatsBox;