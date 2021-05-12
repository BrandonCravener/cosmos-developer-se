import { InstantSearch, connectSearchBox } from 'react-instantsearch-dom';
import { fade, makeStyles } from '@material-ui/core/styles';

import Account from '../components/account/account';
import AppBar from '@material-ui/core/AppBar';
import Head from 'next/head';
import Image from "next/image";
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { useRouter } from 'next/router';

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
        queryBy: "name,description,categories"
    }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

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
    }
}));

export default function Search() {
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
    const CustomSearchBox = connectSearchBox(SearchBox);

    console.log(router.query);

    return (
        <>
            <Head>
                <title>Cosmos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Account />
                <AppBar position="static">
                    <Toolbar>
                        <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={107} height={24} ></Image>
                        <div className={classes.spacer}></div>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InstantSearch
                                indexName="pages"
                                searchClient={searchClient}
                            >
                                <CustomSearchBox />
                            </InstantSearch>
                        </div>
                        <div className={classes.spacer}></div>
                    </Toolbar>
                </AppBar>
            </main>
        </>
    );
}