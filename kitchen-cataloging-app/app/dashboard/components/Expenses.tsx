'use client'

import { Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'

export const Expenses = () => {
  return (
    <div className='py-4'>
      <div className='flex flex-row justify-between'>
        <div>
          <Typography className='text-default-sys-light-primary py-2'>
            Expenses
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
            $9000
          </Typography>
          <Typography className='text-default-ref-neutral-neutral60'>
            spent this week
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

      <div>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Weekly', 'Monthly', 'Yearly'] }]}
          series={[{ data: [50] }, { data: [1500] }, { data: [10000] }]}
          width={400}
          height={300}
        />
      </div>
    </div>
  )
}
