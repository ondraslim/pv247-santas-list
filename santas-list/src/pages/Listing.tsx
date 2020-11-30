import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { GiftListModel } from "../data/DataTypes";
import { useState } from "react";
import RecipientListItem from "../components/RecipientListItem";
import ListCard from "../components/ListCard";
import List from "@material-ui/core/List";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/styles";



const useStyles = makeStyles({
    fullSizeCard: {
        height: "100%",
        width: "100%",
    },
});


const lists: GiftListModel[] = [
    { id: "1", name: "Christmas 2021", recipients: [{ id: "1", name: "Joe", note: "No idea", budget: 100, gifts: [] }] },
    { id: "2", name: "Bar mitzvah", recipients: [] },
    { id: "3", name: "Wedding", recipients: [] },
    { id: "4", name: "Christmas", recipients: [] },
    { id: "5", name: "Christmas 2020", recipients: [] },
    { id: "6", name: "Dunno", recipients: [] },
    { id: "7", name: "Me", recipients: [] },
    { id: "8", name: "Me again", recipients: [] }
];


const Listing: FC = () => {
    const classes = useStyles();


    const [list, setList] = useState<GiftListModel>();
    const [error, setError] = useState<string>("");
    const [newListingName, setNewListingName] = useState<string>("");

    const onClick = (listingId: string) => {
        console.log("click on " + listingId);
        setList(lists.find(l => l.id === listingId));
    };

    return (
        <div>
            <Typography variant="h2">List page</Typography>
            {
                list &&
                <List>
                    {
                        list.recipients.map(rec => (
                            <RecipientListItem key={rec.id} recipient={rec} onClick={onClick} />
                        ))
                        // TODO: no recipients -> show something
                        // TODO: go back to the listings
                    }
                </List>
            }

            {/* TODO: change multiline lambdas to separate functions */}
            {!list &&
                <Grid container direction='row' spacing={3} justify="space-evenly">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card className={classes.fullSizeCard}>
                            <CardHeader title="Create new gift list!" />
                            <CardContent>
                                <CardGiftcardRoundedIcon />
                                <TextField
                                    error={error ? true : false} // TODO: how to convert to bool?
                                    id="listing-new-name"
                                    placeholder="my awesome gift list..."
                                    value={newListingName}
                                    onChange={e => {
                                        setNewListingName(e.target.value);
                                        setError("");
                                    }}
                                    helperText={error}
                                />
                            </CardContent>
                            <CardActions>
                                <Button variant="text" color="primary" onClick={() => {
                                    if (!newListingName) {
                                        setError("Gift list name is required!")
                                        return;
                                    }
                                    console.log("creating new list " + newListingName);
                                }}>
                                    Create new list
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    {lists.map(l => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ListCard key={l.id} onClick={onClick} listing={l} />
                        </Grid>
                    ))}
                </Grid>
            }
        </div >
    );
};

export default Listing;