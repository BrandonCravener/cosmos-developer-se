import { AppBar, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ElevationScroll } from "../lib/ElevationScroll";
import { NavBarProps } from "../lib/types";
import styles from "../styles/NavBar.module.css";
import SearchInput from "./SearchInput";

function NavBar(props: NavBarProps) {
  return (
    <ElevationScroll>
      <AppBar className={styles.navBar} position="sticky">
        <Toolbar>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs>
              <Link href="/">
                <a>
                  <Image className="logo" src="/images/Logo.svg" alt="logo" width={160.5} height={36} />
                </a>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <SearchInput size="small" margin="dense" />
            </Grid>

            <Grid item xs></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default NavBar;
