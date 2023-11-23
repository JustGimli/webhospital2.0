import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const DoctorPage = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <span style={{ flexGrow: 1 }}>Доктор</span>
        <IconButton color="inherit">
          <LogoutIcon></LogoutIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  </>
);
