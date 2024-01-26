import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
const SpacesHeader = () => {
    return (
      <div>
        <NavigationDepthBar
          items={[
            {
              routePath: "dashboard",
              title: "Home",
            },
            { routePath: "spaces", title: "Spaces" },
          ]}
        />
            <div></div>
      </div>
    );
};
export default SpacesHeader;
