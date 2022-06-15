import { AppBar, Toolbar, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <StorageIcon />
        <Typography variant="h6" component="div">
          Sprintform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
