import { createTheme } from "@mui/material";
import { amber, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
    },
    secondary: {
      main: grey[700],
    },
  },
});

export default theme;
