import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "./account.module.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Account() {
    const [session, loading] = useSession()
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
    }

    const logout = () => {
        signOut();
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton aria-label="Account" aria-controls="account-menu" aria-haspopup="true" onClick={handleClick} className={styles.icon}>
                <AccountCircleIcon />
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
    )
}