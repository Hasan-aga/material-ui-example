import { createTheme } from "@mui/material";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#1D3557",
    },
    secondary: {
      main: "#E63946",
      contrastText: "#ffffff",
      light: "#e67b81",
    },
    background: {
      default: "#A8DADC",
      paper: "#F1FAEE",
    },
    error: {
      main: "#E07A5F",
    },
    warning: {
      main: "#F2CC8F",
    },
    info: {
      main: "#457B9D",
    },
    success: {
      main: "#A8DADC",
    },
  },
  typography: {
    fontFamily: "Barlow Condensed",
  },
};

const sailingTheme = createTheme({ ...themeOptions });
export default sailingTheme;
