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
  onClick: () => void;
  onDelete: () => void;
};

const ReceiverListItem: FC<Props> = ({ recipient, onClick, onDelete, children }) => {
  return (
    <ListItem onClick={onClick} onMouseOver={() => console.log("onmouseover")}>
      <ListItemAvatar>
        <Avatar>
          <CardGiftcardRoundedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Joe Doe"
        secondary="My very thoughful note about the gift for him..." />

      <ListItemSecondaryAction>
        <Tooltip title="Delete this receiver">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ReceiverListItem;
