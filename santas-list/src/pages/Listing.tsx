import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import React, { FC } from "react";
import ListingListItem from "../components/ListingListItem";
import { GiftListModel } from "../data/DataTypes";
import { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import tree from './tree.png';
import Hidden from "@material-ui/core/Hidden";
import { ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button/Button";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import ReceiverListItem from "../components/ReceiverListItem";

type ListType = 'listing' | 'receivers';

const onClick = () => { console.log("onClick!") };
const onDelete = () => { console.log("delete!") };

const Listing: FC = () => {
    //TODO: load from firestore, order by name
    const [listType, setListType] = useState<ListType>('listing');
    const [list, setList] = useState<GiftListModel>();

    // TOOD: 1. show LIST of listings
    // 2. show LIST of recipients of selected listing
    return (
        <div>
            <Typography variant="h2">List page</Typography>
            <Grid container direction='row' spacing={1} justify="space-evenly">
                <Grid item xs={12} md={6} >
                    <List>
                        {listType === 'listing' && list?.recipients.map(rec => (
                            <ListingListItem key={rec.id} listing={rec} onClick={onClick} onDelete={onDelete}>
                            </ListingListItem>
                        ))}

                        {listType === 'receivers' && list?.recipients.map(rec => (
                            <ReceiverListItem key={rec.id} recipient={rec} onClick={onClick} onDelete={onDelete}>
                            </ReceiverListItem>
                        ))}

                        {!list && /* TODO dev purposes only */
                            <ListItem onClick={onClick} onMouseOver={() => console.log("onmouseover")}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CardGiftcardRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Joe Doe"
                                    secondary="My very thoughful note about the gift for him..." />

                                <ListItemSecondaryAction>
                                    <Tooltip title="Delete this item">
                                        <IconButton onClick={onDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>

                                {/*TODO: this is the only thing that will stay in this ELSE branch
                                 <ListItemText primary="No lists found :(" secondary="Create a new one!" /> */}
                            </ListItem>
                        }
                    </List>
                    <Button variant="contained" color="primary" fullWidth onClick={() => console.log("Add new recipient")}>
                        Add new recipient
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Hidden smDown>
                        <img src={tree} className="App-logo" alt="tree" />
                    </Hidden>
                </Grid>
            </Grid>
        </div >
    );
};

export default Listing;