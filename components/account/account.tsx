import { signIn, signOut, useSession } from 'next-auth/client';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DetailsIcon from '@material-ui/icons/Details';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
        top: '4px',
        right: '4px',
        position: 'fixed',
        'z-index': 99,
        [theme.breakpoints.up('sm')]: {
            top: '8px',
            right: '8px',
        },
    }
}));

export default function Account() {
    const classes = useStyles();
    const [session, loading] = useSession();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const login = () => {
        signIn();
        setAnchorEl(null);
    };

    const logout = () => {
        signOut();
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton aria-label="Account" aria-controls="account-menu" aria-haspopup="true" onClick={handleClick} className={classes.icon}>
                {session ? <DetailsIcon /> : <AccountCircleIcon />}

            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {session ?
                    <MenuItem onClick={logout}>Logout</MenuItem> :
                    <MenuItem onClick={login}>Login</MenuItem>
                }
            </Menu>
        </>
    );
}