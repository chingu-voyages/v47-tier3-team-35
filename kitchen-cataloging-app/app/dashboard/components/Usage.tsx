'use client'

import { Typography } from '@mui/material'

export const Usage = () => {
  return (
    <div className='py-4'>
      <div className='flex flex-row justify-between'>
        <div>
          <Typography className='text-default-sys-light-primary py-2'>
            Usage
          </Typography>
        </div>
        <div className='flex flex-row py-2'>
          <Typography className='pr-2 hover:text-default-sys-light-primary hover:underline'>
            1W
          </Typography>
          <Typography className='pr-2 hover:text-default-sys-light-primary hover:underline'>
            1M
          </Typography>
          <Typography className='pr-2 hover:text-default-sys-light-primary hover:underline'>
            1Y
          </Typography>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <Typography className='text-default-ref-neutral-neutral30'>
            12
          </Typography>
          <Typography className='text-default-ref-neutral-neutral60'>
            items used
          </Typography>
        </div>
        <div className='h-[50px] bg-default-ref-neutral-neutral60 w-[2px] ' />
        <div>
          <Typography className='text-default-ref-neutral-neutral30'>
            % Change
          </Typography>
          <Typography className='text-default-ref-neutral-neutral60'>
            since last week
          </Typography>
        </div>
      </div>
    </div>
  )
}
