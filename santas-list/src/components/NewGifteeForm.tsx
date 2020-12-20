import { Button, Grid, InputAdornment, ListItem, TextField, Box } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { FC, useState, useContext } from "react";
import { Giftee, GiftList } from "../data/DataTypes";
import { v4 as uuidv4 } from 'uuid';
import { setGiftee } from "../utils/firebase";
import UserContext from "../context/UserContext"
import { useTranslation } from 'react-i18next';



type Props = {
    giftList: GiftList;
    onGifteeCreated: (giftee: Giftee) => void;
    setChange: (n: number) => void;
};


const NewGifteeForm: FC<Props> = ({ giftList, onGifteeCreated, setChange }) => {
    const { user } = useContext(UserContext);
    const [newGifteeName, setNewGifteeName] = useState<string>("");
    const [error, setError] = useState<string>("");
    
    const { t } = useTranslation();

    const onCreateNewGiftee = () => {
        if (!newGifteeName) {
            setError(t('newGifteeForm.name_required'));
            return;
        }

        const newGiftee = {
            id: uuidv4(),
            name: newGifteeName,
            budget: 0,
            note: "",
            gifts: []
        };

        setChange(3);
        giftList.recipients.push(newGiftee);

        if (user?.email) {
            setGiftee(giftList.name, newGiftee, user).then(() => {
                setNewGifteeName("");
                onGifteeCreated(newGiftee);
                setError("");
            }).catch((error: Error) => {
                setError(t('newGifteeForm.create_error'));
                console.log(error.message)
            });    
        }

        
            
    };

    return (
        <ListItem>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={t('newGifteeForm.new_giftee')}
                        error={error ? true : false}
                        value={newGifteeName}
                        onChange={e => {
                            setNewGifteeName(e.target.value);
                            setError("");
                        }}
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
                </Grid>
                <Grid item xs={12}>
                    <Box m="2rem"></Box>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onCreateNewGiftee} fullWidth>
                        {t('newGifteeForm.create_new')}
                    </Button>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default NewGifteeForm;
