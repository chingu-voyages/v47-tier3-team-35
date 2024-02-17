import React from "react";
import { Box, Typography } from "@mui/material";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
const ComingSoonBanner = () => {
  return (
    <Box className="flex items-center justify-center">
      <Box className="flex flex-col justify-center items-center grow max-w-screen-sm">
        <Box className="flex items-center justify-center">
          <CampaignOutlinedIcon className="text-14xl xs:text-15xl md:text-16xl xl:text-17xl text-default-ref-neutral-neutral40" />
          <Typography className="text-10xl xs:text-11xl md:text-12xl xl:text-13xl leading-relaxed text-default-ref-neutral-neutral40 font-medium">
            Coming Soon!
          </Typography>
        </Box>
        <Typography className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl leading-normal tracking-wide text-default-ref-neutral-neutral30 text-center">
          Thank you for showing interest! This feature isn't available yet, but
          we working hard to make it functional for you!
        </Typography>
      </Box>
    </Box>
  );
};
export default ComingSoonBanner;
