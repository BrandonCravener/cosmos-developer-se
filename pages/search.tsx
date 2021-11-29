import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  AlertTitle,
  AppBar,
  Collapse,
  Fade,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  NoSsr,
  OutlinedInput,
  Pagination,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import React from "react";

import Account from "../components/account/account";
import Hits from "../components/hits/hits";
import StaticContent from "../components/StaticContent/StaticContent";
import dbConnect from "../middlewares/dbConnect";
import Bookmark from "../models/Bookmark";
import styles from "../styles/search.module.css";

export interface RouterProps {
  router: NextRouter;
}
export interface SearchProps extends RouterProps {
  window?: () => Window;
  children: React.ReactElement;
  bookmarks: any;
}
export interface SearchResult {
  title: string;
  url: string;
  description: string;
  thumbnail: string;
}
export interface SearchState {
  search: string;
  searchResults: SearchResult[];
  pagination: any[];
  page: number;
  empty: boolean;
  loading: boolean;
}


// Handles look of AppBar on scroll
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    color: trigger ? "primary" : "transparent",
    elevation: trigger ? 1 : 0,
  });
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props) {
    super(props);

    this.state = {
      empty: true,
      loading: true,
      page: 1,
      pagination: [],
      search: decodeURIComponent(String(this.props.router.query.q)),
      searchResults: [],
    };

    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount() {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutationIndex in mutationsList) {
        const mutation = mutationsList[mutationIndex];

        if (
          (mutation as any).target.tagName === "DIV" &&
          mutation.addedNodes.length > 0 &&
          (mutation as any).addedNodes[0].className ===
          "gsc-cursor-box gs-bidi-start-align"
        ) {
          // Clear search results
          this.setState((prevState) => ({
            empty: false,
            loading: false,
            pagination: (mutation as any).addedNodes[0].firstChild.children,
            search: prevState.search,
            searchResults: [],
          }));

          const results = document.querySelectorAll(
            ".gsc-webResult.gsc-result"
          );

          for (let i = 0; i < results.length; i += 1) {
            const result = results[i].firstElementChild;

            const title = result.querySelector("a").innerText;
            const description = (
              result.querySelector(
                ".gsc-table-cell-snippet-close .gs-snippet"
              ) as HTMLElement
            ).innerHTML;
            const url = result.querySelector("a").href;

            let thumbnail = null;
            if (result.querySelector("img")) {
              thumbnail = result.querySelector("img").src;
            }

            //  Update search results
            this.setState((prevState) => ({
              empty: prevState.empty,
              loading: prevState.loading,
              pagination: prevState.pagination,
              search: prevState.search,
              searchResults: [
                ...prevState.searchResults,
                {
                  description,
                  thumbnail,
                  title,
                  url,
                },
              ],
            }));
          }
        } else if (
          document.querySelectorAll(".gs-no-results-result").length > 0
        ) {
          this.setState({
            empty: true,
            loading: false,
          });
        }
      }
    });
    observer.observe(document.querySelector("html"), {
      childList: true,
      subtree: true,
    });
  }

  // Search box event handlers
  handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && this.state.search.trim().length > 0) {
      window.location.search = `?q=${encodeURIComponent(this.state.search)}`;
    }
  };

  handleSearch = () => {
    if (this.state.search.trim().length > 0) {
      window.location.search = `?q=${encodeURIComponent(this.state.search)}`;
    }
  };

  // Utilities to handle paging
  triggerEvent(el, etype) {
    if (el.fireEvent) {
      el.fireEvent(`on${etype}`);
    } else {
      const evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  pageChange(event: React.ChangeEvent<unknown>, value: number) {
    this.setState({
      page: value,
    });
    this.triggerEvent(this.state.pagination[value], "click");
  }

  render() {
    return (
      <>
        <Head>
          <title>Cosmos</title>
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src="https://cse.google.com/cse.js?cx=214fb45efb17d9c24"
          />
        </Head>
        <main>
          <Account />
          <ElevationScroll {...this.props}>
            <AppBar className={styles.appBar} position="sticky">
              <Toolbar>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <Link href="/">
                    <a className={styles.linkLogo}>
                      <Hidden mdDown>
                        <Image className="logo" src="/images/Logo.svg" alt="Cosmos Logo" width={160.5} height={36}/>
                      </Hidden>
                      <Hidden mdUp>
                        <Image className="logo" src="/images/NewSmallLogo.svg" alt="Cosmos Logo" width={36} height={36}/>
                      </Hidden>
                    </a>
                  </Link>
                  <Grid item xs={10} md={7} lg={6}>
                    <NoSsr>
                      <FormControl variant="outlined" size="small" margin="dense" fullWidth>
                        <InputLabel htmlFor="search-bar">Search</InputLabel>
                        <OutlinedInput id="search-bar" label="Search" value={this.state.search}
                          onChange={(e) => {
                            this.setState({
                              search: e.target.value,
                            });
                          }}
                          onKeyDown={this.handleSearchKeyDown}
                          endAdornment={
                            <InputAdornment
                              position="end"
                              onClick={this.handleSearch}
                            >
                              <IconButton aria-label="Search for results">
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          fullWidth />
                      </FormControl>
                    </NoSsr>
                  </Grid>
                </Grid>
              </Toolbar>
              <Collapse in={this.state.loading}>
                <LinearProgress />
              </Collapse>
            </AppBar>
          </ElevationScroll>
          <StaticContent>
            <div className="gcse-searchresults-only" />
          </StaticContent>

          {this.state.empty && !this.state.loading && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              No Results, try adjusting your search query!
            </Alert>
          )}
          <Hits hits={this.state.searchResults} bookmarks={this.props.bookmarks}/>
          <br />
          <br />
          <br />
          <Fade in={!this.state.empty}>
            <Grid container item direction="column" justifyContent="center" alignItems="center" xs={12}>
              <Pagination count={10} shape="rounded" page={this.state.page} onChange={this.pageChange}/>
            </Grid>
          </Fade>
          <br />
          <br />
        </main>
      </>
    );
  }
}

// Handle bookmarks and send to client
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    await dbConnect();

    const result = await Bookmark.find({ userID: session.userId });
    const bookmarks = result.map((doc) => {
      const bookmark = doc.toObject();
      bookmark._id = bookmark._id.toString();
      bookmark.dateAdded = bookmark.dateAdded.toString();
      return bookmark;
    });

    return { props: { bookmarks } };
  }
  return { props: { bookmarks: [] } };
}

export default withRouter(Search);
