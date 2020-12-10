import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, listStats, getGifts, setGift, setGiftee, setGiftList } from "../utils/firebase"
import UserContext from "../context/UserContext"
import { GiftListStats, UserStats, Gift, Giftee, GiftList } from "../data/DataTypes"

import tree from './tree.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    app: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
    },

    grid: {
        flex: '1 0 auto',
    },

    card: {
        boxShadow: '0 3px 5px 2px rgba(56, 56, 56, 0.83)',
    },

    media: {
        height: 140,
      },

}));

const Home: FC = () => {
    const [userStats, setUserStats] = useState<UserStats>({giftListCount: -1, gifteeCount:-1})
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: 0});
    const [chosenList, setChosenList] = useState<string>("Gyda's 23rd birthday");
    const { user } = useContext(UserContext);

    const g:Gift = {id: "1", name: "test gift", url: "testURL", price: 0}
    const gft: Giftee = {id: "1", name: "test person", note: "test note", budget: 10, gift: []}
    const l: GiftList = {id: "1", name: "test gift list", user: "maryjane@santa.com", recipients: [gft]}

    const [gifts, setGifts] = useState<Array<Gift>>([])

    useMemo(() => {
        if (user?.email) {
            statsForUser(user).then(val => {
                setUserStats(val)
        })}
    }, [user])

    useMemo(() => {
        if (user?.email) {            
            setGiftee(chosenList, gft, user);            
            setGift(chosenList, "test", g, user);
            setGiftList(l);
        }
    }, [user, chosenList])
    
    useMemo(() => {
        if (user?.email) {    
            listStats(chosenList, user).then(val => {
                setGiftListStats(val);
            })
            getGifts(chosenList, "Gyda Haraldsdottir", user).then(val => {
                setGifts(val);        
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
                Chosen list: { chosenList } and nr. of people on chosen list: { giftListStats.gifteeCount } and min budget for this list: { giftListStats.minCount } for { giftListStats.minName } and max: { giftListStats.maxCount } for { giftListStats.maxName }. Average budget: { giftListStats.avgCount }.
                <br />
                Get gifts name for Gyda Haraldsdottir: { gifts[1]?.name }
                <br />
                Get gifts name for { gft.name }: { gifts[0]?.name }
                <br />
                Gift { g.name } added via method
                <br />
                Giftee { gft.name } added via method 
                <br />
                Gift list { l.name } added via method
                </p>
            )} 
        </div>
    );
};

export default Home;