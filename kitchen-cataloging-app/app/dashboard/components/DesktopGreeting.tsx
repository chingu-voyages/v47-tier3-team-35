import { Container, Typography } from '@mui/material'
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone'
import { ActionCards } from './ActionCards'
import { User } from '@prisma/client'

export const DesktopGreeting = ({
  user,
  largeWidth,
}: {
  user: Partial<User>
  largeWidth: boolean
}) => {
  return (
    <div className='py-[25px]'>
      <Container className='flex flex-row items-center p-0'>
        <Typography
          variant='h5'
          sx={{
            fontSize: '1.6rem',
            width: 'auto',
          }}
          className='flex flex-start'
        >
          Welcome, {user?.firstName}!
        </Typography>
        <WavingHandTwoToneIcon />
      </Container>
      <Container className='flex items-center p-0'>
        <Typography variant='subtitle2' sx={{ fontSize: '.6rem' }}>
          How Can we Help you?
        </Typography>
      </Container>
      <ActionCards />
    </div>
  )
}
