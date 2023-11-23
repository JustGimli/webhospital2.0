import { AppBar, IconButton, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const AppBarComp = ({ name }: any) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <span style={{ flexGrow: 1 }}>{name}</span>
        <div className="flex justify-between">
          <span>{"name"}</span>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </>
);
