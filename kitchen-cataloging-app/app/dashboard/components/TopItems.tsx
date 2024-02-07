'use client'

import { Typography, Box } from '@mui/material'

export const TopItems = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <Typography className='text-default-sys-light-primary'>
            Top Items
          </Typography>
        </div>
        <div className='flex'>
          <Box
            sx={{ width: 100, height: 100 }}
            className='bg-default-ref-neutral-neutral40'
          >
            <Typography>Month</Typography>
            <Box>
              <Typography>Week</Typography>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}
