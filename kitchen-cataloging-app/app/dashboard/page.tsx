import { Container, Grid, Typography } from "@mui/material";
import WavingHandTwoToneIcon from "@mui/icons-material/WavingHandTwoTone";
import getUserInfoServer from "@/auth/providers/auth/ServerAuthProvider";
import { auth } from "@clerk/nextjs";
const DashboardGreeting = async () => {
  const { userId } = auth();
  const user = await getUserInfoServer({ userId });
  return (
    <Container className="flex flex-row items-center p-0">
      <Typography
        variant="h5"
        sx={{
          fontSize: "1.8rem",
          width: "auto",
        }}
      >
        Welcome, {user?.firstName}!
      </Typography>
      <WavingHandTwoToneIcon />
    </Container>
  );
};
const DashboardContent = () => {
  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid item xs={12} sm={6} md={8}></Grid>
      <Grid item xs={12} sm={6} md={4}></Grid>
    </Grid>
  );
};
export default async function Dashboard() {
  return (
    <div>
      <DashboardGreeting />
      <DashboardContent />
    </div>
  );
}
