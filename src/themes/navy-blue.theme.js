import { createTheme } from "@mui/material";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3D405B",
    },
    secondary: {
      main: "#689881",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F4F1DE",
      paper: "#F2CC8F",
    },
    error: {
      main: "#E07A5F",
    },
    warning: {
      main: "#F2CC8F",
    },
    info: {
      main: "#3D405B",
    },
    success: {
      main: "#81B29A",
    },
  },
};

const navyBlueTheme = createTheme({ ...themeOptions });
export default navyBlueTheme;
