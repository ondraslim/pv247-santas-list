import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import tree from './tree.png';

import React, { FC } from "react";
import { makeStyles } from '@material-ui/styles';



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
    const classes = useStyles();

    return (
        <div className="App">
            <Grid container spacing={3} className={classes.app}>
                <Grid item xs={12} container>
                    <Grid item xs container direction="row" spacing={3}>
                        <Grid item className={classes.grid}>
                            <Grid item xs container direction="column" spacing={5}>
                                <Grid item>
                                    <Card style={{ backgroundColor: 'purple', minHeight: '33vh'}} className={classes.card}>
                                        <CardContent>
                                            <Typography>
                                                TOTAL STATS
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                    <Grid item>
                                    <Card style={{ backgroundColor: 'green', minHeight:'33vh'}} className={classes.card}>
                                        <CardContent>
                                            <Typography>
                                                LIST STATS
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                    </Grid>
                                </Grid>
                                <Hidden smDown>
                                    <Grid item className={classes.grid} lg={4} xs={4}>
                                        <Card style={{ backgroundColor: 'blue', minHeight: '70vh' }} className={classes.card}>
                                        <CardContent>
                                        <CardMedia image='./tree.png' className={classes.media}>
                                        </CardMedia>

                                        </CardContent>
                                        </Card>
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
        </div>
    );
};

export default Home;