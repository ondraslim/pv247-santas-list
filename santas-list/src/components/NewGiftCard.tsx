import React, { useState } from "react";
import { FC } from "react";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AddIcon from '@material-ui/icons/Add';
import { createNewGiftList, useLoggedInUser } from "../utils/firebase";
import { GiftList } from "../data/DataTypes";
import { v4 as uuidv4 } from 'uuid';



const useStyles = makeStyles({
  fullSizeCard: {
    height: "100%",
    width: "100%",
  },
});


const NewGiftCard: FC = () => {
  const classes = useStyles();

  const [error, setError] = useState<string>("");
  const [newListingName, setNewListingName] = useState<string>("");

  const user = useLoggedInUser();

  const handleSubmit = async () => {
    if (!newListingName) {
      setError("Gift list name is required!")
      return;
    }

    if (!user) {
      setError("Only logged in users can create new git lists!")
      return;
    }

    try {
      const newGiftList: GiftList = {
        id: uuidv4(),
        name: newListingName,
        user: user!.uid,
        gifts: [],
        recipients: []
      };

      console.log("creating new list " + { ...newGiftList });

      await createNewGiftList(newGiftList);
    } catch (err) {
      setError(err.what);
    }
  };

  return (
    <Card className={classes.fullSizeCard}>
      <CardHeader title="Create new gift list!" />
      <CardContent>
        <p style={{ textAlign: "center" }}>
          <CardGiftcardRoundedIcon />
          <br />
          <AddIcon />

          <TextField
            error={error ? true : false} // TODO: how to convert to bool?
            id="listing-new-name"
            placeholder="my awesome gift list..."
            value={newListingName}
            onChange={e => {
              setNewListingName(e.target.value);
              setError("");
            }}
            helperText={error}
          />
        </p>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary" onClick={handleSubmit}>
          Create new list
        </Button>
      </CardActions>
    </Card>
  )
};

export default NewGiftCard;
