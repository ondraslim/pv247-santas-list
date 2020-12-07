import { Grid, FormControl, InputLabel, Input, InputAdornment, TextField, Button, FormHelperText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState, useEffect } from "react";
import { Giftee } from "../data/DataTypes";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';



type Props = {
    selectedGiftee: Giftee;
    onSaveChanges: (updatedGiftee: Giftee) => void;
};


const GifteeDetail: FC<Props> = ({ selectedGiftee, onSaveChanges }) => {
    const [giftee, setGiftee] = useState<Giftee>(selectedGiftee);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setGiftee(selectedGiftee);
    }, [selectedGiftee]);

    console.log(giftee);

    const handleSubmit = () => {
        if (!giftee.budget) {
            setError("Giftee's budget is required.")
        }
        if (giftee.budget! < 0) {
            setError("Giftee's budget cannot be a negative number.")
        }
        if (!giftee.name) {
            setError("Giftee's name is required.")
        }

        onSaveChanges(giftee);
    };

    return (
        <>
            <Grid item md={6}>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={giftee.name}
                        onChange={e => setGiftee(g => {
                            setError("");
                            return { ...g, name: e.target.value }
                        })}
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
                        onChange={e => setGiftee(g => {
                            setError("");
                            return { ...g, budget: +e.target.value }
                        })}
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
                    onChange={e => setGiftee(g => { return { ...g, note: e.target.value }; })}
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

            {error &&
                <Grid item xs={12}>
                    <FormHelperText error>{error}</FormHelperText>
                </Grid>
            }
            <Grid item md={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Save changes
                </Button>
            </Grid>
        </>
    );
};

export default GifteeDetail;
