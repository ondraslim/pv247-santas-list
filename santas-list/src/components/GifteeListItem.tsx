import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { Giftee } from "../data/DataTypes";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


type Props = {
  giftee: Giftee;
  onClick: (gifteeId: string) => void;
};

const GifteeListItem: FC<Props> = ({ giftee, onClick }) => {
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
        <Tooltip title="Delete this giftee">
          <IconButton onClick={() => { console.log("delete " + giftee.id) /* TODO: db.listings.recipient.remove */ }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GifteeListItem;
