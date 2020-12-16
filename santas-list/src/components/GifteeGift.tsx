import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Tooltip } from "@material-ui/core";
import React, { FC, useEffect, useState, } from "react";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Gift } from "../data/DataTypes";
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import { Item, searchOnline } from "../utils/api";
import { forEachChild } from "typescript";




type Props = {
  gift: Gift;
  onGiftChange: (gift: Gift) => void;
  onGiftDelete: (giftId: string) => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GifteeGift: FC<Props> = ({ gift, onGiftChange, onGiftDelete }) => {
 /* const item5: Item = { title: "title 5", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
  const item6: Item = { title: "title 6", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
  const item4: Item = { title: "title 4", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
  const item1: Item = { title: "title 1", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
  const item2: Item = { title: "title 2", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
  const item3: Item = { title: "title 3", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
  const item7: Item = { title: "title 7", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
  const item8: Item = { title: "title 8", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };*/

  const [open, setOpen] = React.useState(false);
  const [searchName, setSearch] = useState<string>("default");
  const [gifts, setGifts] = useState<Item[]>([]);
  const [giftItem, setGiftItem] = useState<Item | undefined>(undefined);
  const defaultImg: string = "https://i.ibb.co/2P0DfdP/Daco-4409798.png";


  const handleClickOpen = () => {
    searchOnline(searchName).then(response => {
      /*let tempGifts: Item[] = [];
      response.items.forEach(item => {
        tempGifts.push(title: item.title, link: item.link, imgLink: item.pagemap.cse_image)
      })*/
      setGifts(response.items); console.log(response.items);
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <Grid container justify="space-between" direction="column">
            <Grid item >
              <FormControl>
                <InputLabel htmlFor="gift-name-input">Name</InputLabel>
                <Input
                  id="gift-name-input"
                  value={gift.name}
                  onChange={e => {
                    onGiftChange({ ...gift, name: e.target.value })
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <CardGiftcardRoundedIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="filled">
                <InputLabel htmlFor="gift-price-adornment">Price</InputLabel>
                <Input
                  id="gift-price-adornment"
                  type="number"
                  value={gift.price ?? ""}
                  onChange={e => {
                    onGiftChange({ ...gift, price: +e.target.value })
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Tooltip title="Delete this gift">
                <IconButton onClick={() => {
                  onGiftDelete(gift.id)
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        
        
        {!giftItem ? (
          <Grid item md={6} lg={6} xs={12}>
            <Grid container>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="gift-name-input">Search</InputLabel>
                  <Input
                    id="gift-name-input"
                    value={searchName}
                    onChange={e => setSearch(e.target.value)}
                  />
                </FormControl>
                <Tooltip title="Search">
                  <IconButton onClick={() => {
                    handleClickOpen()
                  }}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        ) :
          (
            <Grid item md={6} lg={6} xs={12}>
              <Grid container>
                <Grid item>
                  <GridList cols={1} cellHeight={150}>
                    <GridListTile key={giftItem.imgLink}>
                      <img src={giftItem.pagemap.cse_image.length > 0 ? giftItem.pagemap.cse_image[0].src : defaultImg} alt={giftItem.title} onClick={() => window.open(giftItem.link, "_blank")}/>
                      <GridListTileBar
                        title={giftItem.title}
                        actionIcon={
                          <IconButton onClick={() => console.log("DELETE")} color='primary'>
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  </GridList>
                </Grid>
              </Grid>
            </Grid>
          )}
      </Grid>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <GridList cellHeight={180}>
          {gifts.map((tile) => (
            <GridListTile key={tile.title}>
              <img src={tile.pagemap.cse_image.length > 0 ? tile.pagemap.cse_image[0].src : defaultImg} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <div>
                    <IconButton onClick={() => window.open(tile.link, "_blank")} color='primary'>
                      <InfoIcon />
                    </IconButton>
                    <IconButton onClick={() => { setGiftItem(tile); setOpen(false); }} color='primary'>
                      <AddIcon />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>

      </Dialog>
    </>
  );
};

export default GifteeGift;
