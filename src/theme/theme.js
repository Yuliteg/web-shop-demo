import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    success: {
      main: "rgb(1, 135, 68)",
    },
    background: {
      default: "#dfdede6e",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0px 0px 4px rgba(145, 158, 171, 0.24), 0px 4px 8px -4px rgba(145, 158, 171, 0.24)`,
        },
      },
    },
  },
});
