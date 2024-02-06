import ResponsivePaddingWrapper from "@/components/layout/ResponsivePaddingWrapper";
import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
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
      <>
        <NavigationDepthBar items={navDepthItems} />
      </>
    </ResponsivePaddingWrapper>
  );
};
export default GroceriesPage;
