"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import palatte from "./palatte";
import typography from "./typography";
const theme = createTheme({
  palette: palatte,
  typography: typography,
});
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default ThemeProviderWrapper;
