import { Box, Typography } from "@mui/material";
import React from "react";
import SelectInput from "../inputs/select/SelectInput";
import { ValueProps } from "../inputs/select/types";
export default function FormHeader({
  header,
  defaultSpaceValue,
}: {
  header: string;
  defaultSpaceValue?: ValueProps;
}) {
  return (
    <section className="modal-header w-full flex pb-10">
      <Box className="flex flex-col gap-8">
        <Typography className="text-default-sys-light-on-surface" variant="h2">
          {header}
        </Typography>
        <SelectInput
          defaultValue={defaultSpaceValue}
          name="space"
          placeholder="Choose Space"
          loadOptions={async () => []}
        />
      </Box>
    </section>
  );
}
