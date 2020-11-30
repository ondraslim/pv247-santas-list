import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { RecipientModel } from "../data/DataTypes";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


type Props = {
  recipient: RecipientModel;
  onClick: (recipient: string) => void;
};

const RecipientListItem: FC<Props> = ({ recipient, onClick }) => {
  return (
    <ListItem onClick={() => onClick(recipient.id)} >
      <ListItemAvatar>
        <Avatar>
          <CardGiftcardRoundedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Joe Doe"
        secondary="My very thoughful note about the gift for him..." />

      <ListItemSecondaryAction>
        <Tooltip title="Delete this recipient">
          <IconButton onClick={() => { console.log("delete " + recipient.id) /* TODO: db.listings.recipient.remove */  } }>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RecipientListItem;
