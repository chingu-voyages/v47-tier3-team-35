import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
const SpacesHeader = () => {
  return (
    <div className="flex flex-col w-full space-y-6 mb-6">
      <NavigationDepthBar
        items={[
          {
            routePath: "dashboard",
            title: "Home",
          },
          { routePath: "spaces", title: "Spaces" },
        ]}
      />
      <Button variant="text" className="space-x-2 justify-start pl-0 w-fit">
        <AddIcon fontSize="large" />
        <Typography
          variant="subtitle1"
          className="font-medium"
          sx={{
            textTransform: "none",
          }}
        >
          Add Space
        </Typography>
      </Button>
    </div>
  );
};
export default SpacesHeader;
