import { Grid } from "@mui/material";
import React from "react";

export function GridItemLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid item xxs={12} sm={6} md={4} xl={3}>
      {children}
    </Grid>
  );
}

export default function GridLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid
      container
      rowSpacing={{
        xxs: 3,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      columnSpacing={{
        xxs: 0,
        sm: 2,
        md: 3,
        lg: 4,
      }}
    >
      {children}
    </Grid>
  );
}
