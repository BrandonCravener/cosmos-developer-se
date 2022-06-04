import { Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { withRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import { HomeProps } from "../lib/types";

const Home: NextPage<HomeProps> = ({ router }) => {
  return (
    <>
      <Grid className={styles.fullGrid} spacing={2} justifyContent="center" alignItems="center" container>
        <Grid item>
          <Image priority className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={320} height={72} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" component="div" align="center">
            <i>Custom search engine for developers.</i>
          </Typography>
        </Grid>
        <Grid item xs={11} md={6} lg={4}>
          <SearchBar />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(Home);
