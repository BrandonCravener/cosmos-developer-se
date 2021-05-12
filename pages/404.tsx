import Grid, { GridSpacing } from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Cosmos - 404 Not Found</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <main className={styles.main}>
                <Grid container
                    className={styles.grid}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={4}>
                    <Grid item>
                        <Image className="logo" src="/images/404.svg" alt="404 Not Found" width={720} height={162} ></Image>
                    </Grid>
                    <Grid item>
                        <Link href="/">
                            <Button variant="outlined" size="large" color="secondary">Back!</Button>
                        </Link>
                    </Grid>
                </Grid>
            </main>
        </>
    );
}