import { Grid, FormControl, InputLabel, Input, InputAdornment, TextField, Button, FormHelperText, Typography, Box } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState, useEffect } from "react";
import { Gift, Giftee } from "../data/DataTypes";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';
import GifteeGift from "./GifteeGift";
import { v4 as uuidv4 } from 'uuid';
import Alert from '@material-ui/lab/Alert';


type Props = {
    selectedGiftee: Giftee;
    onSaveChanges: (updatedGiftee: Giftee) => void;
    setChange: (n: number) => void;
    setChangesSaved: (b: boolean) => void;
};


const GifteeDetail: FC<Props> = ({ selectedGiftee, onSaveChanges, setChange, setChangesSaved }) => {
    const [giftee, setGiftee] = useState<Giftee>(selectedGiftee);
    const [error, setError] = useState<string>("");
    const [giftsError, setGiftsError] = useState<string>("");

    useEffect(() => {
        setGiftee(selectedGiftee);
    }, [selectedGiftee]);

    const onAddGift = () => {
        setChange(9);
        setChangesSaved(false);
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts.push({ id: uuidv4(), name: "", price: 0, url: "" });
        setGiftee(updatedGiftee);
    }

    const onGiftDelete = (giftId: string) => {
        setChange(9);
        setChangesSaved(false);
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts = updatedGiftee.gifts.filter(g => g.id !== giftId);
        setGiftee(updatedGiftee);
    }

    const onGiftUpdate = (gift: Gift) => {
        setChange(9);
        setChangesSaved(false);
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts = updatedGiftee.gifts.map(g => g.id === gift.id ? gift : g);
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
        setError("");
        setGiftsError("");
        onSaveChanges(giftee);
    };


    return (
        <Grid item container xs={12} md={6} spacing={5}>
            <Grid item md={12}>
                <Typography variant="h5" align="center">Detail</Typography>
            </Grid>
            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            <Grid item xs={12} md={6}>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={giftee.name}
                        onChange={e => setGiftee(g => {  
                            setChange(1);    
                            setChangesSaved(false);                      
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
                            setChange(1);
                            setChangesSaved(false);
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
                    onChange={e => {
                        console.log("?")
                        setChange(1);
                        setChangesSaved(false);
                        setGiftee(g => { return { ...g, note: e.target.value }; 
                        })}}
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
                    <Typography variant="h5" align="center">Gifts</Typography>
                </Grid>

                {giftsError && <Grid item xs={12}><Alert severity="error">{giftsError}</Alert></Grid>}

                <Grid item container xs={12}>
                    {giftee.gifts && giftee.gifts.map(g => (
                        <GifteeGift key={g.id} gift={g} onGiftChange={onGiftUpdate} onGiftDelete={onGiftDelete}/>
                    ))}
                </Grid>
                <Grid item>
                    <Box m="2rem"></Box>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onAddGift} fullWidth>
                        Add New Gift
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Save changes
                </Button>
            </Grid>
        </Grid>
    );
};

export default GifteeDetail;
