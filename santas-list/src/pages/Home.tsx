import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tree from './tree.png';

import React, { FC, useState, useContext, useMemo } from "react";
import { statsForUser, listStats, setGiftee, setGiftList, getLists } from "../utils/firebase"
import UserContext from "../context/UserContext"
import { GiftListStats, UserStats, Gift, Giftee, GiftList } from "../data/DataTypes"

const Home: FC = () => {
    const [userStats, setUserStats] = useState<UserStats>({giftListCount: -1, gifteeCount:-1})
    const [giftListStats, setGiftListStats] = useState<GiftListStats>({gifteeCount: -1, maxCount: -1, minCount: -1, maxName: "", minName: "", avgCount: 0});
    const [chosenList, setChosenList] = useState<string>("Gyda's 23rd birthday");
    const { user } = useContext(UserContext);
    const [giftLists, setGiftLists] = useState<GiftList[]>([]);

    const g:Gift = {id: "1", name: "test gift", url: "testURL", price: 0}
    const gft: Giftee = {id: "1", name: "test person", note: "test note", budget: 10, gifts: []}
    const l: GiftList = {id: "1", name: "test gift list", user: "maryjane@santa.com", recipients: [gft]}

   
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
            setGiftList(l);
        }
    }, [user, chosenList])
    
    useMemo(() => {
        if (user?.email) {    
            listStats(chosenList, user).then(val => {
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
                Chosen list: { chosenList } and nr. of people on chosen list: { giftListStats.gifteeCount } and min budget for this list: { giftListStats.minCount } for { giftListStats.minName } and max: { giftListStats.maxCount } for { giftListStats.maxName }. Average budget: { giftListStats.avgCount }.
                <br />
                Gift { g.name } added via method
                <br />
                Giftee { gft.name } added via method 
                <br />
                Gift list { l.name } added via method
                <br />
                { giftLists[1]?.name }, { giftLists[0]?.user }
                </p>
            )}       
        </div>
    );
};

export default Home;