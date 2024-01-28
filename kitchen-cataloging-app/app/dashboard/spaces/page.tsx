import { paginateRooms } from "./actions";
import SpacesHeader from "./components/SpacesHeader";
import SpacesList from "./components/SpacesList";
const SpacesPage = async () => {
  //grab initial room data
  const defaultRooms = await paginateRooms({
    take: 10,
  });
  return (
    <main className="flex flex-col w-full h-full">
      <SpacesHeader />
      <SpacesList defaultItems={defaultRooms} />
    </main>
  );
};

export default SpacesPage;
