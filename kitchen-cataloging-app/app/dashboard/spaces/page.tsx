import { paginateRooms } from './actions'
import SpacesHeader from './components/SpacesListHeader'
import SpacesList from './components/SpacesList'
import NavigationDepthBar from '@/components/navigation/navigationDepthBar/NavigationDepthBar'
const SpacesPage = async () => {
  //grab initial room data
  const defaultRooms = await paginateRooms({
    take: 10,
  })
  return (
    <>
      <NavigationDepthBar
        items={[
          {
            routePath: 'dashboard',
            title: 'Home',
          },
          { routePath: 'spaces', title: 'Spaces' },
        ]}
      />
      <main className='flex flex-col w-full h-full'>
        <SpacesHeader />
        <SpacesList defaultItems={defaultRooms} />
      </main>
    </>
  )
}

export default SpacesPage
