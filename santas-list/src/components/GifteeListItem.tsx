import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { Giftee } from "../data/DataTypes";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { useTranslation } from 'react-i18next';


type Props = {
  giftee: Giftee;
  onClick: (gifteeId: string) => void;
  onDelete: (gifteeId: string) => void;
};

const GifteeListItem: FC<Props> = ({ giftee, onClick, onDelete }) => {
  // const handleDelete = (event) => {
  //   event.stopPropagation();
  // onDelete(giftee.id);
  // }

  const { t } = useTranslation();

  return (
    <ListItem onClick={() => onClick(giftee.id)} >
      <ListItemAvatar>
        <Avatar>
          <CardGiftcardRoundedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={giftee.name}
        secondary={giftee.note} />
      <ListItemSecondaryAction>
        <Tooltip title={t('gifteeListItem.delete').toString()}>
          <IconButton onClick={() =>  onDelete(giftee.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GifteeListItem;
