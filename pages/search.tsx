import { NextRouter, withRouter } from 'next/router'
import React, { cloneElement } from 'react';

import Account from '../components/account/account';
import AppBar from '@material-ui/core/AppBar';
import Bookmark from '../models/Bookmark';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Head from 'next/head';
import Hits from '../components/hits/hits';
import IconButton from '@material-ui/core/IconButton';
import Image from "next/image";
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import StaticContent from '../components/StaticContent/StaticContent';
import Toolbar from '@material-ui/core/Toolbar';
import dbConnect from '../middlewares/dbConnect';
import { getSession } from 'next-auth/client';
import styles from '../styles/search.module.css';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface RouterProps {
    router: NextRouter
}
interface SearchProps extends RouterProps {
    window?: () => Window;
    children: React.ReactElement;
    bookmarks: any;
}
interface SearchResult {
    title: string;
    url: string;
    description: string;
    thumbnail: string;
}
interface SearchState {
    search: string;
    searchResults: SearchResult[];
    pagination: any[];
    page: number;
}

function ElevationScroll(props: SearchProps) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });
    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props) {
        super(props);
        this.state = {
            search: decodeURIComponent(String(this.props.router.query['q'])),
            searchResults: [],
            pagination: [],
            page: 1
        };

        this.pageChange = this.pageChange.bind(this);
    }

    handleSearchKeyDown = (e) => {
        if (e.key == "Enter" && this.state.search.trim().length > 0) {
            window.location.search = `?q=${encodeURIComponent(this.state.search)}`;
        }
    };
    handleSearch = () => {
        if (this.state.search.trim().length > 0) {
            window.location.search = `?q=${encodeURIComponent(this.state.search)}`;
        }
    }

    eventFire(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    pageChange(event: React.ChangeEvent<unknown>, value: number) {
        this.setState({
            page: value
        });
        this.eventFire(this.state.pagination[value], "click");
    };

    componentDidMount() {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutationIndex in mutationsList) {
                let mutation = mutationsList[mutationIndex];

                if ((mutation as any).target.tagName === "DIV" && mutation.addedNodes.length > 0
                    && (mutation as any).addedNodes[0].className == "gsc-cursor-box gs-bidi-start-align"
                ) {
                    this.setState(prevState => ({
                        search: prevState.search,
                        searchResults: [],
                        pagination: (mutation as any).addedNodes[0].firstChild.children
                    }));

                    const results = document.querySelectorAll(".gsc-webResult.gsc-result");

                    for (let i = 0; i < results.length; i++) {
                        const result = results[i].firstElementChild;

                        const title = result.querySelector("a").innerText;
                        const description = (result.querySelector(".gsc-table-cell-snippet-close") as HTMLElement).innerText;
                        const url = result.querySelector("a").href;

                        let thumbnail = null;
                        if (result.querySelector("img")) {
                            thumbnail = result.querySelector("img").src;
                        }
                        // console.log(`Title: ${title}, URL: ${url}, Description: ${description}, Thumbnail URL: ${thumbnail}`);
                        this.setState(prevState => ({
                            search: prevState.search,
                            searchResults: [...prevState.searchResults, {
                                title: title,
                                url: url,
                                description: description,
                                thumbnail: thumbnail
                            }],
                            pagination: prevState.pagination
                        }))
                    }
                }
            }
        });
        observer.observe(document.querySelector("html"), {
            childList: true,
            subtree: true
        });
    }

    render() {
        return (
            <>
                <Head>
                    <title>Cosmos</title>
                    <link rel="icon" href="/favicon.ico" />
                    <script async src="https://cse.google.com/cse.js?cx=214fb45efb17d9c24"></script>
                </Head>
                <main>
                    <Account />
                    <ElevationScroll {...this.props}>
                        <AppBar className={styles.appBar} position="sticky">
                            <Toolbar>
                                <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={107} height={24}></Image>
                                <div className={styles.spacer}></div>
                                <FormControl variant="filled" size="small" color="secondary">
                                    <InputLabel htmlFor="search-query">Search</InputLabel>
                                    <FilledInput
                                        id="search-query"
                                        value={this.state.search}
                                        onChange={(e) => {
                                            this.setState({
                                                search: e.target.value
                                            })
                                        }}
                                        onKeyDown={this.handleSearchKeyDown}
                                        endAdornment={
                                            <InputAdornment position="end" onClick={this.handleSearch}>
                                                <IconButton aria-label="Search for results">
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <div className={styles.spacer}></div>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    <StaticContent>
                        <div className="gcse-searchresults-only"></div>
                    </StaticContent>
                    <Hits hits={this.state.searchResults} bookmarks={this.props.bookmarks}></Hits>
                    <br />
                    <Pagination count={10} shape="rounded" page={this.state.page} onChange={this.pageChange} />
                </main>
            </>
        )
    }
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
    return { props: { bookmarks: [] } }
}

export default withRouter(Search);