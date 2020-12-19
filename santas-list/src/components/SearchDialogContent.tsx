import React, { FC } from "react";

import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { defaultImg, Item } from "../utils/api";


type Props = {
    searchResult: Item[],
    handleSearchItemClicked: (tile: Item) => void;
    columns: number;
};

const SearchDialogContent: FC<Props> = ({ searchResult, handleSearchItemClicked, columns }) => {

    return (
        <GridList cellHeight={180} cols={columns}>
            {searchResult.map((tile) => (
                <GridListTile key={tile.title}>
                    <img
                        src={tile.pagemap.cse_image ? tile.pagemap.cse_image[0].src : defaultImg}
                        alt={tile.title}
                        onClick={() => window.open(tile.link, "_blank")}
                    />
                    <GridListTileBar
                        title={tile.title}
                        actionIcon={
                            <IconButton onClick={() => handleSearchItemClicked(tile)} color='primary'>
                                <AddIcon />
                            </IconButton>
                        }
                    />
                </GridListTile>
            ))
            }
        </GridList>
    );
}

export default SearchDialogContent;