"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import palatte from "./palatte";
import typography from "./typography";
const theme = createTheme({
  palette: palatte,
  typography: typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default ThemeProviderWrapper;
