import { Container, Typography } from '@mui/material'
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone'
import getUserInfo from '@/auth/providers/auth/ServerAuthProvider'
import { ActionCards } from './ActionCards'

export const MobileGreeting = async () => {
  const user = await getUserInfo()
  return (
    <div className='py-[25px]'>
      <Container className='flex flex-row items-center justify-center p-0'>
        <Typography
          variant='subtitle2'
          sx={{
            fontSize: '.75rem',
            width: 'auto',
          }}
        >
          Welcome, {user?.firstName}!
        </Typography>
      </Container>
      <Container className='flex justify-center'>
        <Typography variant='h5' sx={{ fontSize: '1.5rem' }}>
          How can we help you?
        </Typography>
      </Container>
      <ActionCards />
    </div>
  )
}
