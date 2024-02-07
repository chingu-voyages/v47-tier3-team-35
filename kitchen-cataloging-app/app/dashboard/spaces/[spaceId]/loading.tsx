import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import SpacesListSkeleton from "../components/spacesList/SpacesListSkeleton";
import SpacesHeaderSkeleton from "../components/spacesHeader/SpacesHeaderSkeleton";
const SpaceLoading = () => {
  return (
    <ResponsivePaddingWrapper>
      <SpacesHeaderSkeleton />
      <SpacesListSkeleton />
    </ResponsivePaddingWrapper>
  );
};
export default SpaceLoading;
