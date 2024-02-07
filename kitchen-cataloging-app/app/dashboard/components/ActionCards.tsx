import { Box, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import useWindowWidth from '@/hooks/useWindowWidth'

export const ActionCards = () => {
  const mediumWidth = useWindowWidth(640)
  const largeWidth = useWindowWidth(1024)
  return (
    <Grid
      container
      gap={3}
      className='py-5 flex items-center justify-center sm:justify-start'
    >
      <Grid
        item
        xs={5}
        className='bg-default-sys-light-tertiary-container rounded p-3 w-[400px]'
      >
        <Link href={`/dashboard/spaces`}>
          <Box className='flex items-center'>
            <KitchenOutlinedIcon fontSize={largeWidth ? 'large' : 'medium'} />
            <Typography variant='h6' fontSize={largeWidth ? 'large' : 'medium'}>
              Spaces
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize={largeWidth ? 'large' : 'small'}
              className='py-4'
            >
              Manage spaces and current inventory
            </Typography>
          </Box>
        </Link>
      </Grid>
      <Grid
        item
        xs={5}
        className='bg-default-sys-light-primary-container rounded p-3'
      >
        <Link href={`/dashboard/groceries`}>
          <Box className='flex items-center'>
            <LocalGroceryStoreOutlinedIcon
              fontSize={largeWidth ? 'large' : 'medium'}
            />
            <Typography variant='h6' fontSize={largeWidth ? 'large' : 'medium'}>
              Groceries
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize={largeWidth ? 'large' : 'small'}
              className='py-4'
            >
              Review and update your grocery list and history
            </Typography>
          </Box>
        </Link>
      </Grid>
    </Grid>
  )
}
