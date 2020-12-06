import { Button, InputAdornment, ListItem, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Giftee, GiftList } from "../data/DataTypes";
import { v4 as uuidv4 } from 'uuid';
import { updateGiftList } from "../utils/firebase";


type Props = {
    giftList: GiftList;
    onGifteeCreated: (giftee: Giftee) => void;
};


const NewGifteeForm: FC<Props> = ({ giftList, onGifteeCreated }) => {
    const [newGifteeName, setNewGifteeName] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onCreateNewGiftee = () => {
        if (!newGifteeName) {
            setError("The name is required!");
        }

        const newGiftee = {
            id: uuidv4(),
            name: newGifteeName
        };

        giftList.recipients.push(newGiftee);

        updateGiftList(giftList)
            .then(() => {
                setNewGifteeName("");
                onGifteeCreated(newGiftee);
            })
            .catch((error: Error) => {
                setError("New giftee coudn't be created.");
                console.log(error.message)
            });
    };

    return (
        <ListItem>
            <TextField
                fullWidth
                label="New Giftee"
                error={error ? true : false}
                value={newGifteeName}
                onChange={e => setNewGifteeName(e.target.value)}
                variant="outlined"
                helperText={error}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <Button variant="contained" color="primary" onClick={onCreateNewGiftee}>
                Create new
            </Button>
        </ListItem>
    );
};

export default NewGifteeForm;
