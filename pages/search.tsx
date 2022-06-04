import type { NextPage } from "next";
import NavBar from "../components/NavBar";
import { SearchProps } from "../lib/types";

const Search: NextPage<SearchProps> = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Search;
