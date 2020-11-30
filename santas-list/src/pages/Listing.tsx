import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { GiftListModel } from "../data/DataTypes";
import { useState } from "react";
import ReceiverListItem from "../components/ReceiverListItem";
import ListCard from "../components/ListCard";
import List from "@material-ui/core/List";


const lists: GiftListModel[] = [
    { id: "1", name: "Christmas 2021", recipients: [ {id: "1", name: "Joe", note: "No idea", budget: 100, gifts: []} ] },
    { id: "2", name: "Bar mitzvah", recipients: [] },
    { id: "3", name: "Wedding", recipients: [] },
    { id: "4", name: "Christmas", recipients: [] },
    { id: "5", name: "Christmas 2020", recipients: [] },
    { id: "6", name: "Dunno", recipients: [] },
    { id: "7", name: "Me", recipients: [] },
    { id: "8", name: "Me again", recipients: [] }
];


const Listing: FC = () => {
    const [list, setList] = useState<GiftListModel>();

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
                            <ReceiverListItem key={rec.id} recipient={rec} onClick={onClick}/>
                        ))
                        // TODO: no recipients -> show something
                    }
                </List>
            }

            {!list &&
                <Grid container direction='row' spacing={1} justify="space-evenly">
                    {lists.map(l => (
                        <ListCard key={l.id} onClick={onClick} listing={l}>

                        </ListCard>
                    ))}
                </Grid>
            }

        </div >
    );
};

export default Listing;