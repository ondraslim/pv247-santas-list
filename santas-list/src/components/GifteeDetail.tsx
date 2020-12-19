import { Grid, FormControl, InputLabel, Input, InputAdornment, TextField, Button, Typography, Box } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState, useEffect } from "react";
import { Gift, Giftee } from "../data/DataTypes";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';
import GifteeGift from "./GifteeGift";
import { v4 as uuidv4 } from 'uuid';
import Alert from '@material-ui/lab/Alert';
import { deleteGift } from "../utils/firebase";
import { useTranslation } from 'react-i18next';

type Props = {
    selectedGiftListId: string;
    selectedGiftee: Giftee;
    onSaveChanges: (updatedGiftee: Giftee) => void;
    setChange: (n: number) => void;
    setChangesSaved: (b: boolean) => void;
};


const GifteeDetail: FC<Props> = ({ selectedGiftListId, selectedGiftee, onSaveChanges, setChange, setChangesSaved }) => {
    const [giftee, setGiftee] = useState<Giftee>(selectedGiftee);
    const [error, setError] = useState<string>("");
    const [giftsError, setGiftsError] = useState<string>("");

    const { t } = useTranslation();

    useEffect(() => {
        setGiftee(selectedGiftee);

    }, [selectedGiftee]);

    const onAddGift = () => {
        setChange(9);
        setChangesSaved(false);
        let updatedGiftee = { ...giftee };
        updatedGiftee.gifts.push({ id: uuidv4(), name: "", price: 0, url: "", imgUrl: "" });
        setGiftee(updatedGiftee);
    }

    const onGiftDelete = async (giftId: string) => {
        setChange(9);
        setChangesSaved(false);

        try {
            await deleteGift(giftId, giftee.id, selectedGiftListId);
            let updatedGiftee = { ...giftee };
            updatedGiftee.gifts = updatedGiftee.gifts.filter(g => g.id !== giftId);
            setGiftee(updatedGiftee);
        } catch (error) {
            console.log(error.message);
        }
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
            setError(t('gifteeDetail.error_budget'))
            return;
        }
        if (giftee.budget! < 0) {
            setError(t('gifteeDetail.error_budget_neg'))
            return;
        }
        if (!giftee.name) {
            setError(t('gifteeDetail.error_name'))
            return;
        }

        for (let i = 0; i < giftee.gifts.length; i++) {
            const gift = giftee.gifts[i];
            if (!gift.name) {
                setGiftsError(t('gifteeDetail.error_gift_name'));
                return;
            }
            if (gift.price && gift.price < 0) {
                setGiftsError(t('gifteeDetail.error_gift_price'));
                return;
            }
        }
        setError("");
        setGiftsError("");
        onSaveChanges(giftee);
    };

    const giftsSum = giftee.gifts.reduce((price_sum, current) => price_sum + (current.price || 0), 0);

    return (
        <Grid item container xs={12} md={6} spacing={3}>
            <Grid item xs={12} md={12}>
                <Typography variant="h5" align="center">{t('gifteeDetail.title')}</Typography>
            </Grid>
            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            <Grid item xs={12} md={6}>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">{t('gifteeDetail.name')}</InputLabel>
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
                    <InputLabel htmlFor="adornment-budget">{t('gifteeDetail.budget')}</InputLabel>
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
                    label={t('gifteeDetail.note')}
                    value={giftee?.note ?? ""}
                    onChange={e => {
                        console.log("?")
                        setChange(1);
                        setChangesSaved(false);
                        setGiftee(g => {
                            return { ...g, note: e.target.value };
                        })
                    }}
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
                    <Typography variant="h5" align="center">{t('gifteeDetail.gifts')}</Typography>
                </Grid>

                {giftsError && <Grid item xs={12}><Alert severity="error">{giftsError}</Alert></Grid>}
                {giftsSum > giftee.budget && <Grid item xs={12}><Alert severity="warning">{t('gifteeDetail.error_budget_exceeded')}</Alert></Grid>}

                <Grid item container xs={12}>
                    {giftee.gifts && giftee.gifts.map(g => (
                        <GifteeGift key={g.id} gift={g} onGiftChange={onGiftUpdate} onGiftDelete={onGiftDelete} />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Box m="2rem"></Box>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onAddGift} fullWidth>
                        {t('gifteeDetail.add_gift')}
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    {t('gifteeDetail.save')}
                </Button>
            </Grid>
        </Grid>
    );
};

export default GifteeDetail;
