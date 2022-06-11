import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { SearchInputProps } from "../lib/types";
import { SearchIconButton } from "./IconButtons";

function SearchInput(props: SearchInputProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const completeSearch = (e?: MouseEvent<HTMLButtonElement>) => {
    if (search.trim().length == 0) return;

    router.push(`/search?q=${encodeURIComponent(search)}`).then(() => {
      router.reload();
    });
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") completeSearch();
  };

  useEffect(() => {
    const searchQuery = router.query["q"] as string;
    if (searchQuery == undefined) setSearch("");
    else setSearch(searchQuery);
  }, [router.query]);

  return (
    <>
      <FormControl variant="outlined" {...props} fullWidth>
        <InputLabel htmlFor="search-query">Search</InputLabel>
        <OutlinedInput
          endAdornment={SearchIconButton(completeSearch)}
          onChange={inputChange}
          onKeyDown={inputKeyDown}
          value={search}
          id="search-query"
          label="Search"
          fullWidth
        />
      </FormControl>
    </>
  );
}

export default SearchInput;
