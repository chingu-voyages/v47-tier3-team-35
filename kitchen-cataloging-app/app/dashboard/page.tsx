import { Container, Grid, Typography, Button } from "@mui/material";
import WavingHandTwoToneIcon from "@mui/icons-material/WavingHandTwoTone";
import getUserInfo from "@/auth/providers/auth/ServerAuthProvider";
import Link from "next/link";
export const DashboardGreeting = async () => {
  const user = await getUserInfo();
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
export const DashboardContent = () => {
  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid item xs={12} sm={6} md={8}></Grid>
      <Grid item xs={12} sm={6} md={4}></Grid>
      {/* Temporary button for route testing purposes */}
      <Link href={"/dashboard/spaces"}>
        <Button>My Spaces</Button>
      </Link>
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
