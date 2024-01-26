"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import Link from "next/link";
export type NavigationDepthBarItemsProps = {
  routePath: string;
  title: string;
};
export const generateDepthLinks = (items: NavigationDepthBarItemsProps[]) => {
  const strippedStrs = items.map((item) => ({
    ...item,
    routePath: item.routePath.replace(/^\//g, "").replace(/\/$/g, ""),
  }));
  const depthPaths = strippedStrs.map((items, idx) => {
    const currArr = strippedStrs.slice(0, idx + 1);
    let newPath: string;
    if (currArr.length <= 1) newPath = currArr[0].routePath + "/";
    else newPath = currArr.reduce((a, b) => a + b.routePath + "/", "");
    return "/" + newPath.substring(0, newPath.length - 1);
  });
  return depthPaths;
};
/** 
    Returns a Navigation Depth Bar based on items passed in. Each subsequent path in the array 
    will be concatentated with the preceding string to generate the current Navigation depth 
    link. Therefore, when passing a route path, ensure to only pass the end of the path needed, 
    from the preceding one, to generate the new item link.
    ```
    ```
    Example:
    ```
      const arr = [
        {routePath: 'dashboard', title: 'Dashboard'}, 
        {routePath: 'spaces', title: 'Spaces'}
    ]
    ```
    Becomes: 
    ```
        const resultsPath = ["/dashboard", "/dashboard/spaces"]
    ```
*/
const NavigationDepthBar = ({
  items,
}: {
  items: NavigationDepthBarItemsProps[];
}) => {
  const depthPaths = generateDepthLinks(items);
  const mobileView = useWindowWidth(640);
  return (
    <div className="navigation-depth-bar">
      {depthPaths.map((path, idx) => (
        <Link
          key={path}
          href={path}
          className={`navigation-depth-bar-item ${
            mobileView ? "text-sm" : "text-base"
          }`}
        >
          {items[idx].title}
        </Link>
      ))}
    </div>
  );
};
export default NavigationDepthBar;
