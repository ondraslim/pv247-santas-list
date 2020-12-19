import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, getLists } from "../utils/firebase";
import UserContext from "../context/UserContext";
import UserStatsBox from "../components/userStats";
import ListStatsBox from "../components/listStats"
import { UserStats, GiftList } from "../data/DataTypes";
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    app: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        margin: '1px',
    },

    card: {
        borderWidth: '1px',
    },
   
    list: {
        borderStyle: 'none',
        boxShadow: 'none',
    },
});


const Home: FC = () => {
    const classes = useStyles();
    const [userStats, setUserStats] = useState<UserStats>({ giftListCount: -1, gifteeCount: -1 })
    const { user } = useContext(UserContext);
    const { t } = useTranslation();

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

    return (
        <div className="App">
            {(user === undefined || userStats.gifteeCount === -1) ? (
                <Grid container direction="column" style={{ margin: '5px' }}>
                    <Grid item xs={12}>
                        <Typography align="center" color='primary' variant="h5">
                            <CircularProgress /> {t('home.loading')}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                <Grid container direction="column" style={{ margin: '5px' }}>
                    <Grid item xs={12}>                        
                        <br />
                        <Typography variant="h3" align="center">
                            Welcome<Hidden xsDown>, {user?.email}</Hidden> !
                        </Typography>                        
                    </Grid>
                    <Grid container item xs={12} spacing={1} justify='flex-start' className={classes.app}>                            
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <UserStatsBox userStats={userStats}></UserStatsBox>
                            </Grid>     
                            <Grid item>
                                <ListStatsBox giftLists={giftLists}></ListStatsBox>
                                </Grid>                                 
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div >
    );
};

export default Home;