import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import GroceriesHeader from "./components/header/GroceriesHeader";
import GroceriesItemList from "./components/list/GroceriesItemList";
import { auth } from "@clerk/nextjs";
import paginateGroceries from "./actions/search/paginateGroceries";
import PaginationProvider from "@/components/pagination/PaginationProvider";
import { searchGroceryItems } from "./actions/actions";
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
        <GroceriesHeader />
        <GroceriesItemList />
      </PaginationProvider>
    </ResponsivePaddingWrapper>
  );
};
export default GroceriesPage;
