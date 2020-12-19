import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Tooltip } from "@material-ui/core";
import React, { FC, } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Gift } from "../data/DataTypes";
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';


type Props = {
  gift: Gift;
  onGiftChange: (gift: Gift) => void;
  onGiftDelete: (giftId: string) => void;
};


const GifteeGift: FC<Props> = ({ gift, onGiftChange, onGiftDelete }) => {
  const { t } = useTranslation();

    return (
    <>
      <Grid item container xs={12} justify="space-between">
        <Grid item xs={12} md={6}>
          <FormControl>
              <InputLabel htmlFor="gift-name-input">{t('gifteeGift.name')}</InputLabel>
            <Input
              id="gift-name-input"
              value={gift.name}
              onChange={e => {
                onGiftChange({ ...gift, name: e.target.value })}}
              startAdornment={
                <InputAdornment position="start">
                  <CardGiftcardRoundedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="filled">
            <InputLabel htmlFor="gift-price-adornment">{t('gifteeGift.name')}</InputLabel>
            <Input
              id="gift-price-adornment"
              type="number"
              value={gift.price ?? ""}
              onChange={e => {
                onGiftChange({ ...gift, price: +e.target.value })}}
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Tooltip title={t('gifteeGift.delete').toString()}>
            <IconButton onClick={() => {
              onGiftDelete(gift.id)}}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default GifteeGift;
