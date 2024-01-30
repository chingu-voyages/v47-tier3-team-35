import { Box, Typography } from "@mui/material";
import { Room } from "@prisma/client";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import Link from "next/link";
export const MobileSpacesList = ({ data }: { data: Room[] }) => {
  return (
    <Box className="flex flex-col w-full space-y-5">
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            className="flex w-full space-x-2"
            href={`/dashboard/spaces/${item.id}`}
          >
            <KitchenOutlinedIcon
              fontSize={"large"}
              className={`p-[0.2rem] mt-[0.1rem] text-default-ref-neutral-neutral30`}
            />
            <Box className="flex flex-col w-full min-w-0">
              <Typography
                noWrap
                className={`font-medium text-default-ref-neutral-neutral30`}
                sx={{
                  lineHeight: "1.5rem",
                }}
                variant="body1"
              >
                {item.title}
              </Typography>
              <Typography
                noWrap
                variant="caption"
                className={`font-normal text-default-ref-neutral-neutral40`}
              >
                {item.itemCount} items in stock
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
