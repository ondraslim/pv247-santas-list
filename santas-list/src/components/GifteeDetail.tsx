import { Grid, FormControl, InputLabel, Input, InputAdornment, TextField, Button, FormHelperText, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState, useEffect } from "react";
import { Gift, Giftee } from "../data/DataTypes";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';
import GifteeGift from "./GifteeGift";
import { v4 as uuidv4 } from 'uuid';


type Props = {
    selectedGiftee: Giftee;
    onSaveChanges: (updatedGiftee: Giftee) => void;
};


const GifteeDetail: FC<Props> = ({ selectedGiftee, onSaveChanges }) => {
    const [giftee, setGiftee] = useState<Giftee>(selectedGiftee);
    const [error, setError] = useState<string>("");
    const [giftsError, setGiftsError] = useState<string>("");

    useEffect(() => {
        setGiftee(selectedGiftee);
    }, [selectedGiftee]);

    console.log(giftee);

    const onAddGift = () => {
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts.push({ id: uuidv4(), name: "", price: 0, url: "" });
        setGiftee(updatedGiftee);
    }

    const onGiftUpdate = (gift: Gift) => {
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts = updatedGiftee.gifts.map(g => g.id === gift.id ? gift : g);
        setGiftee(updatedGiftee);
    }

    const onGiftDelete = (giftId: string) => {
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts = giftee.gifts.filter(g => g.id !== giftId);
        setGiftee(updatedGiftee);
    }

    const handleSubmit = () => {
        if (!giftee.budget) {
            setError("Giftee's budget is required.")
            return;
        }
        if (giftee.budget! < 0) {
            setError("Giftee's budget cannot be a negative number.")
            return;
        }
        if (!giftee.name) {
            setError("Giftee's name is required.")
            return;
        }

        for (let i = 0; i < giftee.gifts.length; i++) {
            const gift = giftee.gifts[i];
            if (!gift.name) {
                setGiftsError("Gifts must have name specified.");
                return;
            }
            if (gift.price && gift.price < 0) {
                setGiftsError("Gifts cannot have negative price.");
                return;
            }
        }

        onSaveChanges(giftee);
    };

    return (
        <>
            {error &&
                <Grid item xs={12}>
                    <FormHelperText error>{error}</FormHelperText>
                </Grid>
            }
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="adornment-budget">Budget</InputLabel>
                    <Input
                        id="adornment-budget"
                        type="number"
                        value={giftee.budget ?? 0}
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
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="note"
                    label="Note"
                    value={giftee?.note ?? ""}
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
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h4">Gifts</Typography>
                </Grid>
                {giftsError &&
                    <Grid item xs={12}>
                        <FormHelperText error>{giftsError}</FormHelperText>
                    </Grid>
                }
                <Grid item container xs={12}>
                    {giftee.gifts && giftee.gifts.map(g => (
                        <GifteeGift key={g.id} gift={g} updateGift={onGiftUpdate} onDelete={onGiftDelete} />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onAddGift} fullWidth>
                        Add New Gift
                    </Button>
                </Grid>
            </Grid>


            <Grid item md={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Save changes
                </Button>
            </Grid>
        </>
    );
};

export default GifteeDetail;
