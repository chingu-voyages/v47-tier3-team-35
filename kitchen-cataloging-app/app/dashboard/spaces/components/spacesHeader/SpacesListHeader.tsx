"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import SpacesHeaderWrapper from "./wrappers/SpacesHeaderWrapper";
import SpaceForm from "@/components/form/forms/spaceForm/SpaceForm";
const SpacesListHeader = ({ spaceId }: { spaceId?: string }) => {
  const largeWidth = useWindowWidth(1024);
  const mediumWidth = useWindowWidth(640);
  return (
    <SpacesHeaderWrapper>
      <SpaceForm actionType="create">
        {(props) => (
          <Button
            variant="text"
            className="space-x-1.5 sm:space-x-2.5 justify-start pl-0 w-fit"
            onClick={props.handleOpen}
          >
            <AddIcon
              className="p-[0.25rem] md:p-[0.2rem] lg:p-0 font-normal"
              fontSize={"large"}
            />
            <Typography
              variant={
                largeWidth ? "subtitle2" : mediumWidth ? "body1" : "body2"
              }
              className="font-medium"
              sx={{
                textTransform: "none",
              }}
            >
              Add Space
            </Typography>
          </Button>
        )}
      </SpaceForm>
    </SpacesHeaderWrapper>
  );
};
export default SpacesListHeader;
