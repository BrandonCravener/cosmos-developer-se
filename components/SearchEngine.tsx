import { Alert, AlertTitle, Fade, Grid, LinearProgress, Pagination, Slide } from "@mui/material";
import { Box } from "@mui/system";
import Script from "next/script";
import { ChangeEvent, Component } from "react";
import { SearchEngineProps, SearchEngineState } from "../lib/types";
import Results from "./Results";

class SearchEngine extends Component<SearchEngineProps, SearchEngineState> {
  constructor(props: SearchEngineProps) {
    super(props);

    this.state = {
      page: 0,
      loading: true,
      totalPages: 0,
      pagination: null,
      searchResults: [],
    };
  }

  componentDidMount() {
    const observer = new MutationObserver((mutations) => {
      if (document.querySelectorAll(".gs-no-results-result").length > 0) {
        this.setState({
          loading: false,
        });
        return;
      }

      for (const mutation of mutations) {
        if (
          mutation.addedNodes.length > 0 &&
          (mutation as any).addedNodes[0].className === "gcsc-more-maybe-branding-root"
        ) {
          this.setState({
            page: 0,
            totalPages: 0,
            pagination: null,
            searchResults: [],
          });

          const paginationContainer = document.querySelector(".gsc-cursor-box.gs-bidi-start-align>div");
          if (paginationContainer) {
            this.setState({
              totalPages: paginationContainer.children.length,
              page:
                parseInt(
                  document.querySelector(".gsc-cursor-box.gs-bidi-start-align>div>.gsc-cursor-current-page")!
                    .textContent!
                ) - 1,
              pagination: document.querySelector(".gsc-cursor-box.gs-bidi-start-align>div")!.children as any,
            });
          }

          this.parsePage();
        }
      }
    });
    observer.observe(document.querySelector("html")!, {
      childList: true,
      subtree: true,
    });
  }

  parsePage() {
    this.setState({
      searchResults: [],
    });

    const result = document.querySelectorAll(".gsc-webResult.gsc-result");

    for (let i = 0; i < result.length; i++) {
      const page = result[i].firstElementChild!;
      const anchor = page.querySelector("a");

      this.setState((prevState) => ({
        searchResults: [
          ...prevState.searchResults,
          {
            title: anchor!.innerText,
            description: page.querySelector(".gsc-table-cell-snippet-close .gs-snippet")!.innerHTML,
            url: anchor!.href,
          },
        ],
      }));
    }

    this.setState({
      loading: false,
    });
  }

  pageChange = (_event: ChangeEvent<unknown>, value: number) => {
    this.setState({
      page: value - 1,
      loading: true,
    });

    (this.state.pagination![value - 1] as HTMLElement).click();
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <>
        {this.state.loading && <LinearProgress color="secondary" />}

        <Box mt={2}>
          <Results searchResults={this.state.searchResults}></Results>
        </Box>
        <Grid container item direction="column" justifyContent="center" alignItems="center" xs={12} p={4}>
          {!this.state.searchResults.length && !this.state.loading && (
            <Fade in={!this.state.searchResults.length && !this.state.loading}>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                No Results, try adjusting your search query!
              </Alert>
            </Fade>
          )}
          <Fade in={this.state.searchResults.length > 0}>
            <Pagination
              count={this.state.totalPages}
              shape="rounded"
              page={this.state.page + 1}
              onChange={this.pageChange}
            />
          </Fade>
        </Grid>
        <div>
          <Script src={this.props.cseURI}></Script>
          <div className="gcse-searchresults-only"></div>
        </div>
      </>
    );
  }
}

export default SearchEngine;
