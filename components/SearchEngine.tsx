import Script from "next/script";
import { Component } from "react";
import { SearchEngineProps, SearchEngineState } from "../lib/types";

class SearchEngine extends Component<SearchEngineProps, SearchEngineState> {
  constructor(props: SearchEngineProps) {
    super(props);

    this.state = {
      page: 0,
      totalPages: 0,
      pagination: null,
      searchResults: [],
    };
  }

  componentDidMount() {
    const observer = new MutationObserver((mutations) => {
      if (document.querySelectorAll(".gs-no-results-result").length > 0) {
        // results empty
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

      const newPage = {
        title: anchor!.innerText,
        description: page.querySelector(".gsc-table-cell-snippet-close .gs-snippet")!.innerHTML,
        url: anchor!.href,
      };

      this.setState((prevState) => ({
        searchResults: [...prevState.searchResults, newPage],
      }));
    }
  }

  render() {
    return (
      <>
        <Script src={this.props.cseURI}></Script>
        <div className="gcse-searchresults-only"></div>
      </>
    );
  }
}

export default SearchEngine;
