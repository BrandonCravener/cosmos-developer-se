import { AppBar, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AppBarProps } from "../lib/types";
import styles from "../styles/NavBar.module.css";
import SearchInput from "./SearchInput";

function NavBar(props: AppBarProps) {
  return (
    <>
      <AppBar className={styles.navBar} position="sticky">
        <Toolbar>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Link href="/">
              <a>
                <Image className="logo" src="/images/Logo.svg" alt="logo" width={160.5} height={36} />
              </a>
            </Link>
            <Grid item xs={10} md={7} lg={6}>
              <SearchInput />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
