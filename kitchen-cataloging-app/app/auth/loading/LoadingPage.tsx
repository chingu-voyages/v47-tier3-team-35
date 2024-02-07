import GroceriesLoading from "@/dashboard/groceries/loading";
import DashboardLoading from "@/dashboard/loading";
import FoodLoading from "@/dashboard/spaces/[spaceId]/[foodId]/loading";
import SpacesLoading from "@/dashboard/spaces/loading";
import SpaceLoading from "@/dashboard/spaces/[spaceId]/loading";
import { get } from "lodash";
import { headers } from "next/headers";
const LoadingNavbar = () => {
  return (
    <div className="flex flex-row w-full justify-end items-center h-14 sm:h-16 px-6 sm:px-8">
      <div className="animate-pulse bg-gray-400 h-6 w-24 rounded"></div>
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
  //grab url
  const currHeaders = headers();
  const referer = currHeaders.get("referer");
  try {
    const newUrl = new URL(referer || "");
    //parse url into routes
    const pathName = newUrl.pathname.substring(1, newUrl.pathname.length);
    const pathNameArr = pathName.split("/");
    //create search key in dot notation
    const diff = 4 - pathNameArr.length;
    const diffArr = Array(diff > 0 ? diff : 0).fill("");
    const searchArr = [...pathNameArr, ...diffArr];
    const dotNotationSearchStr =
      searchArr.reduce((a, b) => (b ? a + "." + b : a)) + ".layout";
    //find proper layout based on what component is found
    const searchMap = skeletonLayouts({
      spaceId: searchArr[2],
      foodId: searchArr[3],
    });
    //in recursive tree
    const layout = get(searchMap, dotNotationSearchStr, null);
    return (
      <>
        <LoadingNavbar />
        {layout}
      </>
    );
  } catch (err) {
    return (
      <>
        <LoadingNavbar />
      </>
    );
  }
}
