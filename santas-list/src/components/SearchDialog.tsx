import React, { FC } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import SearchDialogContent from "./SearchDialogContent";
import { Item } from "../utils/api";
import { useTranslation } from 'react-i18next';


type Props = {
    open: boolean;
    searchResult: Item[],
    handleSearchItemClicked: (tile: Item) => void;
    handleClose: () => void;
};


const SearchDialog: FC<Props> = ({ searchResult, open, handleClose, handleSearchItemClicked }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={handleClose}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {(searchResult.length === 0) ? (
                <Grid container direction="column" style={{ width: '180px', height: '50vh'}}>
                    <Grid item xs={12}>
                        <Box display="flex"
                            m='auto'
                            alignItems="center"
                            justifyContent="center">
                            <Typography align="left" color='primary' variant="h5">
                                <CircularProgress /> {t('searchDialog.loading')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

            ) : (
                    <div>
                        <Hidden xsDown>
                            <SearchDialogContent
                                columns={2}
                                handleSearchItemClicked={handleSearchItemClicked}
                                searchResult={searchResult}
                            />
                        </Hidden>
                        <Hidden smUp>
                            <SearchDialogContent
                                columns={1}
                                handleSearchItemClicked={handleSearchItemClicked}
                                searchResult={searchResult}
                            />
                        </Hidden>
                    </div>
                )}
        </Dialog>
    );
}

export default SearchDialog;