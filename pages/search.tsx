import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';
import { fade, makeStyles } from '@material-ui/core/styles';

import Account from '../components/account/account';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Image from "next/image";
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
    search: {
        'flex-grow': 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
    spacer: {
        'flex-grow': 1
    },
    truncate: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
    },
    result: {
        padding: '0.4rem'
    },
    appBar: {
        'z-index': 1
    }
}));

function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_KEY,
        nodes: [
            {
                host: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
                port: process.env.NEXT_PUBLIC_TYPESENSE_PORT,
                protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL
            }
        ]
    },
    additionalSearchParameters: {
        queryBy: "title,categories,tags,text"
    }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;


export default function Search(props: Props) {
    const classes = useStyles();
    const router = useRouter();

    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
        <InputBase
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={currentRefinement}
            onChange={(e) => refine(e.currentTarget.value)}
            disabled={isSearchStalled}
        />
    );
    const Hits = ({ hits }) => (
        <Grid container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={1} xs={12}>
            <Grid item xs={11} md={6} lg={4}></Grid>
            {hits.map((hit) => (
                <Grid item xs={11} md={6} lg={4}>
                    <Card className={classes.result} variant="outlined">
                        <Typography variant="h6" component="h6">
                            <u><a href={hit.url}>{hit.title}</a></u>
                        </Typography>
                        <p className={classes.truncate}>{hit.text}</p>
                        {console.log(hit)}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
    const CustomSearchBox = connectSearchBox(SearchBox);
    const CustomHits = connectHits(Hits);

    return (
        <>
            <Head>
                <title>Cosmos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Account />
                <InstantSearch
                    indexName="pages"
                    searchClient={searchClient}
                >
                    <ElevationScroll {...props}>
                        <AppBar className={classes.appBar} position="sticky">
                            <Toolbar>
                                <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={107} height={24}></Image>
                                <div className={classes.spacer}></div>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <CustomSearchBox defaultRefinement={router.query['q']} />
                                </div>
                                <div className={classes.spacer}></div>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    <CustomHits />
                    {/* <Hits hitComponent={Hit} /> */}
                </InstantSearch>
            </main>
        </>
    );
}