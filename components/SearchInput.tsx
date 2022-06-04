import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { SearchBarProps } from "../lib/types";
import { SearchIconButton } from "./IconButtons";

function SearchInput(props: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const completeSearch = (e?: MouseEvent<HTMLButtonElement>) => {
    if (search.trim().length == 0) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") completeSearch();
  };

  return (
    <>
      <FormControl variant="outlined" size="medium" fullWidth>
        <InputLabel htmlFor="search-query">Search</InputLabel>
        <OutlinedInput
          endAdornment={SearchIconButton(completeSearch)}
          onChange={inputChange}
          onKeyDown={inputKeyDown}
          id="search-query"
          label="Search"
          fullWidth
        />
      </FormControl>
    </>
  );
}

export default SearchInput;
