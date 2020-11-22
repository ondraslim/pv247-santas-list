import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tree from './tree.png';

import React, { FC } from "react";

const Home: FC = () => {
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
        </div>
    );
};

export default Home;