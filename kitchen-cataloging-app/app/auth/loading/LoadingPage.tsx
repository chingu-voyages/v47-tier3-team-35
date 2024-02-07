import GroceriesLoading from "@/dashboard/groceries/loading";
import DashboardLoading from "@/dashboard/loading";
import FoodLoading from "@/dashboard/spaces/[spaceId]/[foodId]/loading";
import SpaceLoading from "@/dashboard/spaces/[spaceId]/loading";
import SpacesLoading from "@/dashboard/spaces/loading";
import { get } from "lodash";
import { headers } from "next/headers";
const LoadingNavbar = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5 gap-3">
      <div className=" top-5 right-5 flex gap-2 items-center">
        <div className="animate-pulse bg-gray-400 h-6 w-24 rounded"></div>
      </div>
    </div>
  );
};
type SkeletonLayoutMap = {
  layout: React.ReactNode;
  [key: string]: SkeletonLayoutMap | React.ReactNode;
};
//if sitemap ever changes, this needs to be updated
const skeletonLayouts = ({
  spaceId,
  foodId,
}: {
  spaceId: string;
  foodId: string;
}): SkeletonLayoutMap => ({
  layout: <></>,
  dashboard: {
    layout: <DashboardLoading />,
    spaces: {
      layout: <SpacesLoading />,
      [spaceId]: {
        layout: <SpaceLoading />,
        [foodId]: {
          layout: <FoodLoading />,
        },
      },
    },
    groceries: {
      layout: <GroceriesLoading />,
    },
  },
});
export default function LoadingPage() {
  //grad url
  const currHeaders = headers();
  const referer = currHeaders.get("referer");
  const newUrl = new URL(referer || "");
  //parse url into routes
  const pathName = newUrl.pathname.substring(1, newUrl.pathname.length);
  const pathNameArr = pathName.split("/");
  //create search key in dot notation
  const diff = 4 - pathNameArr.length;
  const diffArr = Array(diff > 0 ? diff : 0).fill("");
  const searchArr = [...pathNameArr, ...diffArr];
  const dotNotationSearchStr =
    searchArr.reduce((a, b) => a + "." + b) + ".layout";
  //find proper layout based on what component is found
  //in recursive tree
  const layout = get(
    skeletonLayouts({ spaceId: searchArr[2], foodId: searchArr[3] }),
    dotNotationSearchStr,
    null
  );
  return (
    <>
      {layout}
      <LoadingNavbar />
    </>
  );
}
