import React, { FC } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import SearchDialogContent from "./SearchDialogContent";
import { Item } from "../utils/api";


type Props = {
    open: boolean;
    searchResult: Item[],
    handleSearchItemClicked: (tile: Item) => void;
    handleClose: () => void;
};


const SearchDialog: FC<Props> = ({ searchResult, open, handleClose, handleSearchItemClicked }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <AppBar position="static" style={{ width: '45vw',}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {(searchResult.length === 0) ? (
                <Grid container direction="column" style={{ width: '45vw', height: '50vh' }}>
                    <Grid item xs={12}>
                        <Typography align="center" color='primary' variant="h5">
                            <CircularProgress /> Loading...
                    </Typography>
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