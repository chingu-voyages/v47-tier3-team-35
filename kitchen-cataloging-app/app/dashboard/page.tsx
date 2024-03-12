import { Grid, Typography, Box, Stack } from "@mui/material";
import WavingHandTwoToneIcon from "@mui/icons-material/WavingHandTwoTone";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { auth } from "@clerk/nextjs";
import ActionBtn from "./components/ActionBtn";
const DashboardGreeting = async () => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  return (
    <>
      <Box className="flex flex-row items-center gap-2 justify-center md:justify-start">
        <Typography
          className="text-default-ref-neutral-neutral30"
          sx={{
            fontSize: { xs: "0.875rem", md: "1.8rem" },
          }}
        >
          Welcome, {user?.firstName}!
        </Typography>
        <WavingHandTwoToneIcon className="hidden md:inline-block" />
      </Box>
      <Typography
        className="text-default-ref-neutral-neutral50"
        sx={{
          fontSize: { xs: "1.5rem", md: "1.125rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        How can we help you?
      </Typography>
    </>
  );
};

const DashboardContent = async () => {
  return (
    <Grid className="my-8">
      <Grid
        item
        // Use grid sizes below when inventory features are added to dashboard
        // xs={12} sm={6} md={8}
      >
        <Stack direction={"row"} className="gap-8">
          <Box className="flex w-full">
            <ActionBtn
              scheme={"green"}
              link="/dashboard/spaces"
              title="Spaces"
              logo={<KitchenOutlinedIcon className="text-[2rem]" />}
              description="Manage your spaces and current inventory"
            />
          </Box>
          <Box className="flex w-full">
            <ActionBtn
              scheme={"blue"}
              link="/dashboard/groceries"
              title="Groceries"
              logo={<LocalGroceryStoreOutlinedIcon className="text-[2rem]" />}
              description="Review and update your grocery list and history"
            />
          </Box>
        </Stack>
      </Grid>
      {/* Use grid space below when inventory features are added to dashboard */}
      {/* <Grid item xs={12} sm={6} md={4}></Grid> */}
    </Grid>
  );
};

export default async function Dashboard() {
  return (
    <div className="m-4 md:m-8 p-8 bg-white md:bg-transparent">
      <DashboardGreeting />
      <DashboardContent />
    </div>
  );
}
