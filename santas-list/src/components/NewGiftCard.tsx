import React, { useState, useContext } from "react";
import { FC } from "react";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AddIcon from '@material-ui/icons/Add';
import { setGiftList } from "../utils/firebase";
import { GiftList } from "../data/DataTypes";
import { v4 as uuidv4 } from 'uuid';
import UserContext from "../context/UserContext";
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles({
  fullSizeCard: {
    height: "100%",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "medium",
  },
});


type Props = {
  giftLists: GiftList[];
  setGiftListsState: (g: GiftList[]) => void;
};


const NewGiftCard: FC<Props> = ({ giftLists, setGiftListsState }) => {
  const classes = useStyles();

  const [error, setError] = useState<string>("");
  const [newListingName, setNewListingName] = useState<string>("");

  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!newListingName) {
      setError(t('newGiftCard.name_required'))
      return;
    }

    if (!user) {
      setError(t('newGiftCard.error_logged_users_only'))
      return;
    }

    if (user?.email) {
      const newGiftList: GiftList = {
        id: uuidv4(),
        name: newListingName,
        user: user.email,
        recipients: []
      };

      try {
        await setGiftList(newGiftList).then(() => {
          setGiftListsState([...giftLists, newGiftList]);
          setNewListingName("");
        }
        );
      } catch (err) {
        setError(err.what);
      }
    }
  };

  return (
    <Card className={classes.fullSizeCard}>
      <CardHeader title={t('newGiftCard.create_new_title')} />
      <CardContent>
        <div style={{ textAlign: "center" }}>
          <CardGiftcardRoundedIcon />
          <br />
          <AddIcon />

          <TextField
            error={error ? true : false}
            id="listing-new-name"
            placeholder={t('newGiftCard.awesome_gift_list')}
            value={newListingName}
            onChange={e => {
              setNewListingName(e.target.value);
              setError("");
            }}
            helperText={error}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary" onClick={handleSubmit}>
          {t('newGiftCard.create_new_btn')}
        </Button>
      </CardActions>
    </Card>
  )
};

export default NewGiftCard;
