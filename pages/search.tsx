import type { NextPage } from "next";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";
import SearchEngine from "../components/SearchEngine";
import { SearchProps } from "../lib/types";

const Search: NextPage<SearchProps> = () => {
  return (
    <>
      <NavBar />
      <SearchEngine cseURI="https://cse.google.com/cse.js?cx=214fb45efb17d9c24" />
    </>
  );
};

export default Search;
