"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import palatte from "./palatte";
import typography from "./typography";
declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
  }
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}
const theme = createTheme({
  palette: palatte,
  typography: {
    ...typography,
    body3: {
      fontSize: "0.875rem",
    },
    body4: {
      fontSize: "0.625rem",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <span> by default
          body3: "span",
          body4: "span",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
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
