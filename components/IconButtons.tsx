import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import { MouseEventHandler } from "react";

export const SearchIconButton = (
  clickHandler: MouseEventHandler<HTMLButtonElement>
) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="search" onClick={clickHandler}>
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  );
};
