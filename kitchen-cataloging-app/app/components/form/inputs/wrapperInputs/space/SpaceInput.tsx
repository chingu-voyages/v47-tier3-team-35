import React from "react";
import { useSpaceInput } from "./SpaceProvider";
import SelectInput from "../../innerComponents/select/SelectInput";
import { Box } from "@mui/material";
import { searchRooms } from "@/actions/space/actions";
export default function SpaceInput() {
  const props = useSpaceInput();
  if (!props) return <></>;
  const { onChange, space } = props;
  return (
    <Box className="flex w-full flex-col">
      <SelectInput
        label="Item Location"
        onChange={onChange}
        value={space}
        name="space"
        placeholder="Choose Space"
        loadOptions={async ({ cursor, inputStr }) => {
          const result = await searchRooms({
            cursor,
            take: 10,
            text: inputStr,
          });
          if (!result) return [];
          else
            return result.map((room) => ({
              value: room.id,
              label: room.title || "",
            }));
        }}
      />
    </Box>
  );
}
