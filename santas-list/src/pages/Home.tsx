import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tree from './tree.png';

import React, { FC, useState, useEffect, useContext } from "react";
import { statsForUser, listStats } from "../utils/firebase"
import UserContext from "../context/UserContext"

const Home: FC = () => {
    const [listCount, setListCount] = useState<number>(0);
    const [gifteeCountState, setGifteeCountState] = useState<number>(0);
    const [chosenList, setChosenList] = useState<string>("Christmas 2020");
    const [gifteesPerList, setGifteesPerList] = useState<number>(0);
    const [minBudgetState, setMinBudgetState] = useState<number>(0);
    const [maxBudgetState, setMaxBudgetState] = useState<number>(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user?.email) {
            statsForUser(user).then(val => {
                setGifteeCountState(val[0]);
                setListCount(val[1]);
            })
            listStats(chosenList).then(val => {
                setMaxBudgetState(val[0]);
                setMinBudgetState(val[1])
                setGifteesPerList(val[2])
            })
        } 
    },[chosenList])
   
    

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
            <p>
                Nr. of lists: { listCount } and nr. of giftees on them: { gifteeCountState }
                <br />
                Chosen list: { chosenList } and nr. of people on chosen list: { gifteesPerList } and min budget for this list: { minBudgetState } and max: { maxBudgetState }
            </p>
        </div>
    );
};

export default Home;