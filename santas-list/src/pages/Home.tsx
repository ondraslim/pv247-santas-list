import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tree from './tree.png';

import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, listStats } from "../utils/firebase"
import UserContext from "../context/UserContext"
import { GiftListStats, UserStats } from "../data/DataTypes"

const Home: FC = () => {
    const [userStats, setUserStats] = useState<UserStats>({giftListCount: -1, gifteeCount:-1})
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({gifteeCount: -1, maxCount: -1, minCount: -1});
    const [chosenList, setChosenList] = useState<string>("Christmas 2020");
    const { user } = useContext(UserContext);


    useMemo(() => {
        if (user?.email) {
            statsForUser(user).then(val => {
                setUserStats(val)
        })}
    }, [user])
    
    useMemo(() => {
        if (user?.email) {            
            listStats(chosenList).then(val => {
                setGiftListStats(val);
            })
        } 
    },[chosenList, user])
   
    

    return (
        <div className="App">
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <img src={tree} className="App-logo" alt="tree" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {(user === undefined || userStats.gifteeCount === -1) ? (
                <p>
                    Loading...
                </p>
            ) : (
                <p>
                Nr. of lists: { userStats.giftListCount } and nr. of giftees on them: { userStats.gifteeCount }
                <br />
                Chosen list: { chosenList } and nr. of people on chosen list: { giftListStats.gifteeCount } and min budget for this list: { giftListStats.minCount } and max: { giftListStats.maxCount }
                </p>
            )}       
        </div>
    );
};

export default Home;