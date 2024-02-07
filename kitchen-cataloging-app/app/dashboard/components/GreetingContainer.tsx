'use client'

import { User } from '@prisma/client'
import { DesktopGreeting } from './DesktopGreeting'
import { MobileGreeting } from './MobileGreeting'
import useWindowWidth from '@/hooks/useWindowWidth'

export const GreetingContainer = ({ user }: { user: Partial<User> }) => {
  const mediumWidth = useWindowWidth(640)
  const largeWidth = useWindowWidth(1024)

  return (
    <div>
      <>
        {largeWidth || mediumWidth ? (
          <DesktopGreeting largeWidth={largeWidth} />
        ) : (
          <MobileGreeting />
        )}
      </>
    </div>
  )
}
