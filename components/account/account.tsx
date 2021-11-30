import { signIn, signOut, useSession } from 'next-auth/client';

import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton, Menu, MenuItem } from '@mui/material';

const useStyles = makeStyles(() => ({
  icon: {
    top: '4px',
    right: '4px',
    position: 'fixed',
    'z-index': 99,
  },
}));

const Account = function () {
  const classes = useStyles();
  const [session] = useSession();
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

  const show = false;
  return (
    <> {
      !show ? <></> : <>
        <IconButton aria-label="Account" aria-controls="account-menu" aria-haspopup="true" onClick={handleClick} className={classes.icon}>
          {session ? <ArrowDropDownIcon /> : <ManageAccountsIcon />}
        </IconButton>
        <Menu id="account-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {session
            ? <MenuItem onClick={logout}>Logout</MenuItem>
            : <MenuItem onClick={login}>Login</MenuItem>}
        </Menu>
      </>
    }
    </>
  );
};

export default Account;
