import { Box, Typography } from "@mui/material";
import React from "react";
import SpaceInput from "../inputs/wrapperInputs/space/SpaceInput";
export default function FormHeader({ header }: { header: string }) {
  return (
    <section className="modal-header w-full flex pb-10">
      <Box className="flex flex-col gap-8 w-full">
        <Typography className="text-default-sys-light-on-surface" variant="h2">
          {header}
        </Typography>
        <SpaceInput />
      </Box>
    </section>
  );
}
