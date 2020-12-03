import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tree from './tree.png';

import React, { FC, useState, useEffect, useContext } from "react";
import { gifteeCount, giftListCountUser } from "../utils/firebase"
import UserContext from "../context/UserContext"

const Home: FC = () => {
    const [listCount, setListCount] = useState<number>(0);
    const [gifteeCountState, setGifteeCountState] = useState<number>(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user?.email) {
            gifteeCount(user).then(val => {
                setGifteeCountState(val);
            });
            giftListCountUser(user).then(val => {
                setListCount(val);
            })
        } 
    },[])
   

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
            </p>
        </div>
    );
};

export default Home;