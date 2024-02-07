import SpacesHeaderSkeleton from "./components/spacesHeader/SpacesHeaderSkeleton";
import SpacesListSkeleton from "./components/spacesList/SpacesListSkeleton";
const SpacesLoading = () => {
  return (
    <>
      <SpacesHeaderSkeleton />
      <SpacesListSkeleton />
    </>
  );
};
export default SpacesLoading;
