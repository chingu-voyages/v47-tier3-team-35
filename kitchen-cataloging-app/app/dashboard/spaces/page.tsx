import SpacesHeader from "./components/spacesHeader/SpacesListHeader";
import SpacesList from "./components/spacesList/SpacesList";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import { paginateSpaces } from "../../actions/space/search/paginateSpaces";
import { auth } from "@clerk/nextjs";
import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
const navItems = [
  {
    routePath: "dashboard",
    title: "Home",
  },
  { routePath: "spaces", title: "Spaces" },
];
const SpacesPage = async () => {
  const { userId } = auth();
  //grab initial room data
  const defaultRooms = await paginateSpaces({
    userId,
    take: 10,
  });
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBar items={navItems} />
      <main className="flex flex-col w-full h-full">
        <SpacesHeader />
        <SpacesList defaultItems={defaultRooms} />
      </main>
    </ResponsivePaddingWrapper>
  );
};

export default SpacesPage;
