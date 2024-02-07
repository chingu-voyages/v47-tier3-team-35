import { UserButton, auth } from "@clerk/nextjs";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function Navbar() {
  const { userId } = auth();
  return (
    <AppBar
      position="static"
      className="
      h-14 sm:h-16 px-2 sm:px-4
      bg-default-sys-light-surface-container-lowest text-default-sys-light-on-surface-variant"
    >
      <Toolbar>
        <IconButton
          className="text-default-sys-light-on-surface-variant"
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Photos
        </Typography>
        {userId && (
          <UserButton showName={true} afterSignOutUrl="/auth/sign-in" />
        )}
      </Toolbar>
    </AppBar>
  );
}
