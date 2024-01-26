import { UserButton, currentUser } from "@clerk/nextjs";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
export default async function Navbar() {
  const user = await currentUser();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Photos
        </Typography>
        {user && <UserButton showName={true} afterSignOutUrl="/sign-in" />}
      </Toolbar>
    </AppBar>
  );
}
