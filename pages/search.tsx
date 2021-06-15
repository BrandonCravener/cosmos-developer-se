import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';
import { fade, makeStyles } from '@material-ui/core/styles';

import Account from '../components/account/account';
import AppBar from '@material-ui/core/AppBar';
import Bookmark from '../models/Bookmark';
import Head from 'next/head';
import Hits from '../components/hits/hits';
import Image from "next/image";
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import dbConnect from '../middlewares/dbConnect';
import { getSession } from 'next-auth/client';
import styles from '../styles/search.module.css';
import { useRouter } from 'next/router';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
    bookmarks: any;
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
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    }
}));

function ElevationScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
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

function Search(props: Props) {
    const classes = useStyles();
    const router = useRouter();
    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
        <InputBase
            placeholder="Search…"
            classes={{
                root: styles.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={currentRefinement}
            onChange={(e) => refine(e.currentTarget.value)}
            disabled={isSearchStalled}
        />
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
                    searchClient={searchClient}>
                    <ElevationScroll {...props}>
                        <AppBar className={styles.appBar} position="sticky">
                            <Toolbar>
                                <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={107} height={24}></Image>
                                <div className={styles.spacer}></div>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <CustomSearchBox defaultRefinement={router.query['q']} />
                                </div>
                                <div className={styles.spacer}></div>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    {/* {console.log(props.bookmarks)} */}
                    <CustomHits bookmarks={props.bookmarks} />
                </InstantSearch>
            </main>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (session) {
        await dbConnect()

        const result = await Bookmark.find({ userID: session.userId })
        const bookmarks = result.map((doc) => {
            const bookmark = doc.toObject()
            bookmark._id = bookmark._id.toString()
            bookmark.dateAdded = bookmark.dateAdded.toString()
            return bookmark
        })

        return { props: { bookmarks: bookmarks } }
    }
    return { props: { bookmarks: {} } }
}

export default Search;