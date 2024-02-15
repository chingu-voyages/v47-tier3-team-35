import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import { NavigationDepthBarSkeleton } from "@/components/navigation/navigationDepthBar/NavigationDepthBarSkeleton";
import SpaceHeaderSkeleton from "./components/header/SpaceHeaderSkeleton";
import InventoryListSkeleton from "../../../components/inventoryList/InventoryListSkeleton";
const SpaceLoading = () => {
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBarSkeleton />
      <SpaceHeaderSkeleton />
      <InventoryListSkeleton />
    </ResponsivePaddingWrapper>
  );
};
export default SpaceLoading;
