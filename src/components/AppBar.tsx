import React, {useState} from "react";
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const CustomAppBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <TranslateIcon style={{marginRight: "10px"}} />
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    LinguaNet
                </Typography>
                <Button color="inherit">About Us</Button>
                <Button color="inherit" onClick={handleClick}>
                    Contact
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Discord: your-discord-id</MenuItem>
                    <MenuItem onClick={handleClose}>Email: stefan@analyzify360.com</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
