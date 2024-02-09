import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import GroceriesHeader from "./components/header/GroceriesHeader";
import GroceriesItemList from "./components/list/GroceriesItemList";
import GroceriesDataProvider from "./components/provider/GroceriesDataProvider";
const navDepthItems = [
  {
    routePath: "/",
    title: "Home",
  },
  {
    routePath: "groceries",
    title: "Groceries",
  },
];
const GroceriesPage = () => {
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBar items={navDepthItems} />
      <GroceriesDataProvider
        
      >
        <GroceriesHeader />
        <GroceriesItemList />
      </GroceriesDataProvider>
    </ResponsivePaddingWrapper>
  );
};
export default GroceriesPage;
