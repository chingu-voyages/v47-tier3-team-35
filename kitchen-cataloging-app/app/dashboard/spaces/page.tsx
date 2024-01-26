import { paginateRooms } from "./actions";
import SpacesHeader from "./components/SpacesHeader";
const SpacesPage = async () => {
  const defaultRooms = await paginateRooms({
    take: 10,
  });

  return (
    <main>
      <SpacesHeader />
    </main>
  );
};

export default SpacesPage;
