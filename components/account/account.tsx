import { signIn, signOut, useSession } from "next-auth/client";

import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  icon: {
    top: "4px",
    right: "4px",
    position: "fixed",
    "z-index": 99,
  },
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
      {/* <IconButton aria-label="Account" aria-controls="account-menu" aria-haspopup="true" onClick={handleClick} className={classes.icon}>
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
            </Menu> */}
    </>
  );
}
