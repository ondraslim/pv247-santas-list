import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { GiftListModel } from "../data/DataTypes";
import { useState } from "react";
import GifteeListItem from "../components/GifteeListItem";
import ListCard from "../components/ListCard";
import List from "@material-ui/core/List";
import { Card, CardHeader, CardContent, CardActions, Input, InputAdornment, InputLabel } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { AccountCircle } from "@material-ui/icons";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';



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


const GiftLists: FC = () => {
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
                <Grid container >
                    <Grid item xs={12} md={6}>
                        <List>
                            {
                                list.recipients.map(rec => (
                                    <GifteeListItem key={rec.id} recipient={rec} onClick={onClick} />
                                ))
                                // TODO: no recipients -> show no recipients found
                                // TODO: go back to the listings
                            }
                            {/* TODO: create new button? */}
                        </List>
                    </Grid>

                    {/* TODO: show form */}
                    <Grid item container xs={12} md={6} spacing={5}>
                        <Grid item md={6}>
                            <FormControl>
                                <InputLabel htmlFor="input-with-icon-adornment">Giftee name</InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl variant="filled">
                                <InputLabel htmlFor="adornment-budget">Budget</InputLabel>
                                <Input
                                    id="adornment-budget"
                                    type="number"
                                    value={100}
                                    onChange={(e) => console.log("New budget " + e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                id="note"
                                label="Note"
                                placeholder="note..."
                                multiline
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <NoteIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item container md={12}>
                            HERE WILL BE A LIST OF GIFTS
                        </Grid>
                        <Grid item md={12}>
                            <Button variant="contained" color="primary" onClick={() => console.log("create new")} fullWidth>
                                Create / Save changes
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            }

            {/* TODO: change multiline lambdas to separate functions */}
            {
                !list &&
                <Grid container direction='row' spacing={3} justify="space-evenly">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card className={classes.fullSizeCard}>
                            <CardHeader title="Create new gift list!" />
                            <CardContent>
                                <CardGiftcardRoundedIcon />
                                <br />
                                <AddIcon />
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

export default GiftLists;