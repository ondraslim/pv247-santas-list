import { FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Tooltip } from "@material-ui/core";
import React, { FC, } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteIcon from '@material-ui/icons/Note';
import { Gift } from "../data/DataTypes";
import DeleteIcon from '@material-ui/icons/Delete';



type Props = {
  gift: Gift;
  updateGift: (gift: Gift) => void;
  onDelete: (giftId: string) => void;
};


const GifteeGift: FC<Props> = ({ gift, updateGift, onDelete }) => {

  return (
    <>
      <Grid item container xs={12} md={12} justify="space-between">
        <Grid item xs={12} md={6}>
          <FormControl>
            <InputLabel htmlFor="gift-name-input">Name</InputLabel>
            <Input
              id="gift-name-input"
              value={gift.name}
              onChange={e => updateGift({ ...gift, name: e.target.value })}
              startAdornment={
                <InputAdornment position="start">
                  <CardGiftcardRoundedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Tooltip title="Delete this giftee">
            <IconButton onClick={() => onDelete(gift.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="filled">
            <InputLabel htmlFor="gift-price-adornment">Price</InputLabel>
            <Input
              id="gift-price-adornment"
              type="number"
              value={gift.price ?? ""}
              onChange={e => updateGift({ ...gift, price: +e.target.value })}
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
            id="gift-note-input"
            label="Note"
            value={gift.note ?? ""}
            onChange={e => updateGift({ ...gift, note: e.target.value })}
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
      </Grid>
    </>
  );
};

export default GifteeGift;
