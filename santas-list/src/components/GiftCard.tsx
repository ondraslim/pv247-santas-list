import { IconButton } from "@material-ui/core";
import React from "react";
import { FC } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { GiftList } from "../data/DataTypes";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import { makeStyles } from "@material-ui/styles";
import { giftListsCollection } from "../utils/firebase";



const useStyles = makeStyles({
  fullSizeCard: {
    height: "100%",
    width: "100%",
  },
});


type Props = {
  giftList: GiftList;
  onClick: (giftListId: string) => void;
};


const GiftCard: FC<Props> = ({ giftList, onClick }) => {
  const classes = useStyles();

  console.log(giftList);

  const deleteGiftList = () => {
    console.log("Deleting GiftList: " + { ...giftList });
    giftListsCollection.doc(giftList.id).delete();
  }

  return (
    <Card onClick={() => onClick(giftList.id)} className={classes.fullSizeCard}>
      <CardHeader title={giftList.name}
        action={
          <Tooltip title="Delete this list.">
            <IconButton onClick={deleteGiftList}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }>

      </CardHeader>
      <CardContent>
        <CardGiftcardRoundedIcon />
        {/* TODO: Typography, nowrap */}
        <p>{giftList.recipients?.map(r => r.name).join(', ')}</p>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  )
};

export default GiftCard;
