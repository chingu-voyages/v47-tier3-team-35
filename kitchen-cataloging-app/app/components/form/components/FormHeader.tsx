import { Box, Typography } from "@mui/material";
import React from "react";
export default function FormHeader({ header }: { header: string }) {
  return (
    <section className="modal-header w-full flex mb-4">
      <Typography className="text-default-sys-light-on-surface" variant="h2">
        {header}
      </Typography>
    </section>
  );
}
