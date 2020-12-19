import React, { FC, useState, } from "react";

import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Tooltip } from "@material-ui/core";
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';

import { Item, searchOnline } from "../utils/api";
import SearchDialog from "../components/SearchDialog";
import { Gift } from "../data/DataTypes";

type Props = {
  gift: Gift;
  onGiftChange: (gift: Gift) => void;
  onGiftDelete: (giftId: string) => void;
};

const GifteeGift: FC<Props> = ({ gift, onGiftChange, onGiftDelete }) => {
  /* const item5: Item = { title: "title 5", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
   const item6: Item = { title: "title 6", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
   const item4: Item = { title: "title 4", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
   const item1: Item = { title: "title 1", imgLink: "https://i.ibb.co/94GvWcr/insights-Icon.png", link: "https://google.com" };
   const item2: Item = { title: "title 2", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
   const item3: Item = { title: "title 3", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
   const item7: Item = { title: "title 7", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };
   const item8: Item = { title: "title 8", imgLink: "https://i.ibb.co/7S4LMvM/insight-Icon-LA.jpg", link: "https://google.com" };*/
  const defaultImg: string = "https://i.ibb.co/2P0DfdP/Daco-4409798.png";

  const [open, setOpen] = React.useState(false);
  const [searchName, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Item[]>([]);

  const handleSearchClicked = () => {
    searchOnline(searchName).then(response => {
      setSearchResult(response.items);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchResult([]);
    setOpen(false);
  };

  const handleSearchItemClicked = (item: Item) => {
    onGiftChange({ ...gift, name: item.title, url: item.link, imgUrl: item.pagemap.cse_image[0]?.src ?? defaultImg });
    setOpen(false);
    setSearchResult([]);
  }

  const onGiftSearchReset = () => {
    onGiftChange({ ...gift, url: "", imgUrl: "" });
    }

  const { t } = useTranslation();

    return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <Grid container justify="space-between" direction="column">
            <Grid item >
              <FormControl>
                <InputLabel htmlFor="gift-name-input">{t('gifteeGift.name')}</InputLabel>
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
                                <InputLabel htmlFor="gift-price-adornment">{t('gifteeGift.price')}</InputLabel>
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
                <Tooltip title={t('gifteeGift.delete').toString()}>
                <IconButton onClick={() => {
                  onGiftDelete(gift.id)
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        {gift.url && gift.imgUrl
          ? (
            <Grid item md={6} lg={6} xs={12}>
              <Grid container>
                <Grid item>
                  <GridList cols={1} cellHeight={110}>
                    <GridListTile key={gift.imgUrl}>
                      <img
                        src={gift.imgUrl ? gift.imgUrl : defaultImg}
                        alt={gift.name}
                        onClick={() => window.open(gift.url, "_blank")}
                        width="100%" />
                      <GridListTileBar
                        title={gift.name}
                        actionIcon={
                          <IconButton onClick={onGiftSearchReset} color='primary'>
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  </GridList>
                </Grid>
              </Grid>
            </Grid>
          ) :
          (
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
                      handleSearchClicked()
                    }}>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          )}
      </Grid>
      <SearchDialog
        open={open}
        searchResult={searchResult}
        handleClose={handleClose}
        handleSearchItemClicked={handleSearchItemClicked}
      />
    </>
  );
};

export default GifteeGift;
