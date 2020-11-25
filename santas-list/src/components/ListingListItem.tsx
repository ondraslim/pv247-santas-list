import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { GiftListModel } from "../data/DataTypes";


type Props = {
  listing: GiftListModel;
  onClick: () => void;
  onDelete: () => void;
};

const ListingListItem: FC<Props> = ({ listing, onClick, onDelete, children }) => {
  return (
    <ListItem onClick={onClick} onMouseOver={() => console.log("onmouseover")}>
      <ListItemAvatar>
        <Avatar>
          <CardGiftcardRoundedIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Christmas 2020"/>

      <ListItemSecondaryAction>
        <Tooltip title="Delete this list">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ListingListItem;
