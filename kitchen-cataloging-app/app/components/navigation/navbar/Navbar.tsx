import { UserButton, auth } from "@clerk/nextjs";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function Navbar() {
  const { userId } = auth();
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
        {userId && <UserButton showName={true} afterSignOutUrl="/auth/sign-in" />}
      </Toolbar>
    </AppBar>
  );
}
