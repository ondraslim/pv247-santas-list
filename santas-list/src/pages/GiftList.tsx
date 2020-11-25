import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import React, { FC } from "react";
import { listing1 } from "../dummyData";
import GiftListItem from "../components/GiftListItem";


const GiftList: FC = () => {
    const listing = listing1;
    return (
        <div>
            <Typography variant="h2">List page</Typography>
            <Grid item xs={12} md={6}>
                <Typography variant="h6">
                    {listing[1]}
                </Typography>
                <List>
                    {listing.map(i => (
                        <GiftListItem key={i[0]}>
                        </GiftListItem>
                    ))}
                </List>
            </Grid>

        </div>
    );
};

export default GiftList;