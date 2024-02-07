'use client'

import { Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

export const Inventory = () => {
  return (
    <div>
      <Typography className='text-default-sys-light-primary py-2'>
        Inventory
      </Typography>
      <div className='border border-black py-10'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 30, label: 'Ramen' },
                { id: 1, value: 2, label: 'Cheetos' },
                { id: 2, value: 10, label: 'Doritos' },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  )
}
