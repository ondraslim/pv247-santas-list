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
import { giftListsCollection } from "../utils/firebase";


type Props = {
  giftList: GiftList;
  onClick: (giftListId: string) => void;
};

const GiftCard: FC<Props> = ({ giftList, onClick }) => {

  console.log(giftList);

  const deleteGiftList = () => {
    console.log("Deleting GiftList: " + { ...giftList });
    giftListsCollection.doc(giftList.id).delete();
  }

  return (
    <Card onClick={() => onClick(giftList.id)}>
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
        <div style={{ textAlign: "center" }}>
          <CardGiftcardRoundedIcon />
          <p>{giftList.recipients?.map(r => r.name).join(', ')}</p>
        </div>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  )
};

export default GiftCard;
