import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import NoSsr from '@mui/material/NoSsr';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import Account from '../components/account/account';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [search, setSearch] = React.useState("");
  const [searchLoading, setSearchLoading] = React.useState(false);

  const handleSearchKeyDown = (e) => {
    if (e.key == "Enter" && search.trim().length > 0) {
      setSearchLoading(true);
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };
  const handleSearch = (e) => {
    if (search.trim().length > 0) {
      setSearchLoading(true);
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  }

  return <>
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
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Grid item>
          <Image priority className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={320} height={72}></Image>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" component="div" align="center">
            <i>Search engine tailored to developers and realted content.</i>
          </Typography>
        </Grid>
        <Grid item xs={11} md={6} lg={4}>
          <NoSsr>
            <FormControl variant="outlined" size="medium" fullWidth>
              <InputLabel htmlFor="search-query">Search</InputLabel>
              <OutlinedInput
                id="search-query"
                label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={handleSearchKeyDown}
                endAdornment={
                  <InputAdornment position="end" onClick={handleSearch}>
                    <IconButton aria-label="Search for results" size="large">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                disabled={searchLoading}
                fullWidth
              />
            </FormControl>
          </NoSsr>
          <br />
          <Collapse in={searchLoading}>
            <LinearProgress />
          </Collapse>
        </Grid>
      </Grid>
    </main>
  </>;
}
