import { Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import React from "react";
import { FC } from "react";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';



type Props = {
  onClick: () => void;
  onDelete: () => void;
};

const GiftListItem: FC<Props> = ({ onClick, onDelete, children }) => {
  return (
    <ListItem>

      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
          primary="Single-line item"
          secondary='Secondary text'
        />
      {/* <Card className={classes.card}>
        <CardActionArea className={classes.action} onClick={onClick}>
          {children}
        </CardActionArea>
      </Card> */}

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GiftListItem;
