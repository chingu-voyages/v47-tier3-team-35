import SpacesHeader from "./components/SpacesListHeader";
import SpacesList from "./components/SpacesList";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { paginateSpaces } from "./utils/paginateSpaces";
import { auth } from "@clerk/nextjs";
import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
const SpacesPage = async () => {
  const { userId } = auth();
  //grab initial room data
  const defaultRooms = await paginateSpaces({
    userId,
    take: 10,
  });
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBar
        items={[
          {
            routePath: "dashboard",
            title: "Home",
          },
          { routePath: "spaces", title: "Spaces" },
        ]}
      />
      <main className="flex flex-col w-full h-full">
        <SpacesHeader />
        <SpacesList defaultItems={defaultRooms} />
      </main>
    </ResponsivePaddingWrapper>
  );
};

export default SpacesPage;
