import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import GroceriesHeader from "./components/header/GroceriesHeader";
import GroceriesItemList from "./components/groceriesList/GroceriesItemList";
import { auth } from "@clerk/nextjs";
import paginateGroceries from "../../actions/groceries/search/paginateGroceries";
import PaginationProvider from "@/components/pagination/PaginationProvider";
import { searchGroceryItems } from "../../actions/groceries/actions";
import GroceriesProvider from "./providers/GroceriesProvider";
const navDepthItems = [
  {
    routePath: "dashboard",
    title: "Home",
  },
  {
    routePath: "groceries",
    title: "Groceries",
  },
];
const GroceriesPage = async () => {
  const { userId } = auth();
  const groceryItemData = await paginateGroceries({ userId, take: 10 });
  return (
    <ResponsivePaddingWrapper>
      <NavigationDepthBar items={navDepthItems} />
      <PaginationProvider
        defaultItems={groceryItemData}
        take={10}
        paginate={searchGroceryItems}
      >
        <GroceriesProvider>
          <GroceriesHeader />
          <GroceriesItemList />
        </GroceriesProvider>
      </PaginationProvider>
    </ResponsivePaddingWrapper>
  );
};
export default GroceriesPage;
