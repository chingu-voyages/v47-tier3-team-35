"use client";
import { Room } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Grid } from "@mui/material";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
type ColorPairType = {
  color1: string;
  color2: string;
};
const determineColorStyles = ({
  idx,
  subtitle,
  title,
  bg,
}: {
  idx: number;
  bg: ColorPairType;
  subtitle: ColorPairType;
  title: ColorPairType;
}) => {
  const isAlternating = idx % 4 === 0 || idx % 4 === 3;
  const isOdd = idx % 2 === 0;
  const largeCurrColor = isOdd ? bg.color1 : bg.color2;
  const mediumCurrColor = isAlternating ? bg.color1 : bg.color2;
  const largeTitleColor = isOdd ? title.color1 : title.color2;
  const mediumTitleColor = isAlternating ? title.color1 : title.color2;
  const largeSubtitleColor = isOdd ? subtitle.color1 : subtitle.color2;
  const mediumSubtitleColor = isAlternating ? subtitle.color1 : subtitle.color2;
  return {
    largeCurrColor,
    mediumCurrColor,
    largeTitleColor,
    mediumTitleColor,
    largeSubtitleColor,
    mediumSubtitleColor,
  };
};
export const DesktopSpacesList = ({
  data,
  largeWidth,
}: {
  data: Room[];
  largeWidth: boolean;
}) => {
  return (
    <Grid
      container
      rowSpacing={{
        sm: 2,
        md: 3,
        lg: 4,
      }}
      columnSpacing={{
        sm: 2,
        md: 3,
        lg: 4,
      }}
    >
      {data.map((item, idx) => {
        const {
          largeCurrColor,
          mediumCurrColor,
          largeTitleColor,
          mediumTitleColor,
          largeSubtitleColor,
          mediumSubtitleColor,
        } = determineColorStyles({
          idx,
          bg: {
            color1: "bg-default-sys-light-tertiary-container",
            color2: "bg-default-sys-light-primary-container",
          },
          subtitle: {
            color1: "text-default-ref-tertiary-tertiary40",
            color2: "text-default-ref-primary-primary40",
          },
          title: {
            color1: "text-default-ref-tertiary-tertiary20",
            color2: "text-default-ref-primary-primary20",
          },
        });
        return (
          <Grid item key={item.id} sm={6} lg={4}>
            <Link
              className={`flex w-full h-full py-4 px-3.5 rounded-26xl ${
                largeWidth ? largeCurrColor : mediumCurrColor
              }`}
              href={`/dashboard/spaces/${item.id}`}
            >
              <Box className="flex w-full space-x-2">
                <KitchenOutlinedIcon
                  fontSize={largeWidth ? "large" : "medium"}
                  className={`mt-1.5 ${
                    largeWidth ? largeTitleColor : mediumTitleColor
                  }`}
                />
                <Box className="flex flex-col w-full space-y-0.5 min-w-0">
                  <Typography
                    noWrap
                    className={`font-medium ${
                      largeWidth ? largeTitleColor : mediumTitleColor
                    }`}
                    sx={{
                      lineHeight: largeWidth ? "1.7rem" : "1.5rem",
                    }}
                    variant={largeWidth ? "subtitle2" : "body1"}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    noWrap
                    variant={largeWidth ? "body2" : "caption"}
                    className={`font-normal  ${
                      largeWidth ? largeSubtitleColor : mediumSubtitleColor
                    }`}
                  >
                    {item.itemCount} items in stock
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};
