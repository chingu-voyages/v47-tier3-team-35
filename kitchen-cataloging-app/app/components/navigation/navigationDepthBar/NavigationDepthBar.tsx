"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Typography } from "@mui/material";
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
const NavigationLink = ({
  path,
  title,
  showSplit,
}: {
  path: string;
  title: string;
  showSplit: boolean;
}) => {
  return (
    <>
      <Link key={path} href={path}>
        <Typography className={`text-2xl font-medium ${showSplit ? "" : ""}`}>
          {title}
        </Typography>
      </Link>
      {showSplit && <Typography className="text-2xl font-medium">/</Typography>}
    </>
  );
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
  if (!mobileView) return <></>;
  return (
    <div className={"flex flex-row items-center space-x-4"}>
      {depthPaths.map((path, idx) => (
        <NavigationLink
          key={path}
          path={path}
          title={items[idx].title}
          showSplit={idx !== items.length - 1}
        />
      ))}
    </div>
  );
};
export default NavigationDepthBar;
