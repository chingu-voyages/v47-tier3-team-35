import { Grid } from "@mui/material";
import React from "react";
export function InventoryListItemGridWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid item xxs={6} md={4} lg={3} xl={2.4}>
      {children}
    </Grid>
  );
}

export default function InventoryListGridWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid
      container
      rowSpacing={{
        xxs: 1.2,
        xs: 1.5,
        sm: 3,
        md: 3,
        lg: 4,
      }}
      columnSpacing={{
        xxs: 1.2,
        xs: 1.5,
        sm: 3,
        md: 3,
        lg: 4,
      }}
    >
      {children}
    </Grid>
  );
}
