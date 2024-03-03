import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react'

export default function FormLoading() {
  return (
    <Box className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-default-sys-light-surface-container-low z-10 space-y-5">
      <CircularProgress size={"3.5rem"} />
      <Typography className="text-6xl text-default-sys-light-primary">
        Loading item data ...
      </Typography>
    </Box>
  );
}
