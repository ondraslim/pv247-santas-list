import React, { FC, useState, } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '../utils/i18';
import { withTranslation } from 'react-i18next';
import { Typography } from "@material-ui/core";


const LocMenu: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState<string>("en");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lng: string) => {
        setLanguage(lng)
        i18n.changeLanguage(lng);
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <Typography variant="button" style={{color: 'white'}}>
                    { language }
                </Typography>
                
            </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage("en")}>EN</MenuItem>
        <MenuItem onClick={() => changeLanguage("cs")}>CS</MenuItem>
        <MenuItem onClick={() => changeLanguage("de")}>DE</MenuItem>
        <MenuItem onClick={() => changeLanguage("es")}>ES</MenuItem>
        <MenuItem onClick={() => changeLanguage("fr")}>FR</MenuItem>
        <MenuItem onClick={() => changeLanguage("it")}>IT</MenuItem>
        <MenuItem onClick={() => changeLanguage("pt")}>PT</MenuItem>
        <MenuItem onClick={() => changeLanguage("ru")}>RU</MenuItem>
      </Menu>
        </div>
    )   
}

export default withTranslation()(LocMenu);