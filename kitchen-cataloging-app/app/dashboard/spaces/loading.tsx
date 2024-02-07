import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import SpacesHeaderSkeleton from "./components/spacesHeader/SpacesHeaderSkeleton";
import SpacesListSkeleton from "./components/spacesList/SpacesListSkeleton";
import { NavigationDepthBarSkeleton } from "@/components/navigation/navigationDepthBar/NavigationDepthBarSkeleton";
const SpacesLoading = () => {
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBarSkeleton />
      <SpacesHeaderSkeleton />
      <SpacesListSkeleton />
    </ResponsivePaddingWrapper>
  );
};
export default SpacesLoading;
