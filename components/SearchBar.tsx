import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { SearchBarProps } from "../lib/types";
import { SearchIconButton } from "./IconButtons";

function SearchBar(props: SearchBarProps) {
  return (
    <>
      <FormControl variant="outlined" size="medium" fullWidth>
        <InputLabel htmlFor="search-query">Search</InputLabel>
        <OutlinedInput
          id="search-query"
          endAdornment={SearchIconButton(() => {
            console.log("Click!");
          })}
          label="Search"
          fullWidth
        />
      </FormControl>
    </>
  );
}

export default SearchBar;
