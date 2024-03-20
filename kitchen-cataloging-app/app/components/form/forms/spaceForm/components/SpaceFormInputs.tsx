import TitleInput from "@/components/form/inputs/wrapperInputs/title/TitleInput";
import { Box } from "@mui/material";
import React from "react";
export default function SpaceFormInputs() {
  return (
    <section className="flex flex-col md:flex-row w-full">
      <Box className="w-full p-0 flex flex-col md:flex-row justify-between gap-6 md:gap-4 [&>*]:w-full">
        <TitleInput label="Room Title" placeholder="My Fridge" />
      </Box>
    </section>
  );
}
