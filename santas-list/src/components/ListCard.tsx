import { IconButton } from "@material-ui/core";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { GiftListModel } from "../data/DataTypes";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
  fullSizeCard: {
    height: "100%",
    width: "100%",
    },
});

type Props = {
  listing: GiftListModel;
  onClick: (listingId: string) => void;
};

const ListCard: FC<Props> = ({ listing, onClick }) => {
  const classes = useStyles();
  
  return (
    <Card onClick={() => onClick(listing.id)} className={classes.fullSizeCard}>
      <CardHeader title={listing.name}
        action={
          <Tooltip title="Delete this list.">
            <IconButton onClick={() => { console.log("click card delete") /* TODO: db.listings.remove...  */ }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }>

      </CardHeader>
      <CardContent>
        <CardGiftcardRoundedIcon />
        <p>{listing.recipients.map(r => r.name).join(', ')}</p>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  )
};

export default ListCard;
