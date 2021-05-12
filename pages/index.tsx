import Account from '../components/account/account';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import IconButton from '@material-ui/core/IconButton';
import Image from 'next/image';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Cosmos</title>
        <meta name="description" content="Curated search engine for developers." />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <main className={styles.main}>
        <Account />
        <Grid container
          className={styles.grid}
          justify="center"
          alignItems="center"
          spacing={4}>
          <Grid item>
            <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={320} height={72} ></Image>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={11} md={6} lg={4}>
            <FormControl variant="filled" size="medium" fullWidth>
              <InputLabel htmlFor="search-query">Search</InputLabel>
              <FilledInput
                id="search-query"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Search for results">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>


      </main>
    </>
  );
}
