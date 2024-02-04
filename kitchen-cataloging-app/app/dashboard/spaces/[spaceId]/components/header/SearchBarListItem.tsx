import { Box, Typography } from "@mui/material";
import { Food } from "@prisma/client";
import Link from "next/link";
export const SearchBarListItem = ({ option }: { option: Partial<Food> }) => {
  return (
    <Link
      href={`dashboard/spaces/${option.roomId}/${option.id}`}
      className="flex flex-row w-full"
    >
      <Box className="min-h-0">
        <Typography>{option.title}</Typography>
      </Box>
    </Link>
  );
};
