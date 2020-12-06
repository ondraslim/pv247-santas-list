import { Grid, FormControl, InputLabel, Input, InputAdornment, TextField, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Giftee } from "../data/DataTypes";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';



type Props = {
    selectedGiftee: Giftee;
    onSaveChanges: (updatedGiftee: Giftee) => void;
};


const GifteeDetail: FC<Props> = ({ selectedGiftee, onSaveChanges }) => {
    const [giftee, setGiftee] = useState<Giftee>(selectedGiftee);
    console.log(giftee);

    return (
        <>
            <Grid item md={6}>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">Giftee name</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={giftee.name}
                        onChange={e => setGiftee(g => { return { ...g, name: e.target.value } })}
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
                        value={giftee.budget}
                        onChange={e => setGiftee(g => { return { ...g, budget: +e.target.value } })}
                        startAdornment={
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item md={12}>
                <TextField
                    fullWidth
                    id="note"
                    label="Note"
                    value={giftee?.note}
                    onChange={e => setGiftee(g => { return { ...g, note: e.target.value } })}
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
                <Button variant="contained" color="primary" onClick={() => onSaveChanges(giftee)} fullWidth>
                    Save changes
                </Button>
            </Grid>
        </>
    );
};

export default GifteeDetail;
