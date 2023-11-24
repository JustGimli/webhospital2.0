import { AppBar, IconButton, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { observer } from "mobx-react-lite";
import { client, doctor } from "..";
import { useNavigate } from "react-router-dom";

export const AppBarComp = observer(({ name }: any) => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <span style={{ flexGrow: 1 }}>{name}</span>
          <div className="flex justify-between items-center">
            <span>{name === "Доктор" ? doctor.name : client.card}</span>
            <IconButton color="inherit" onClick={handelClick}>
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
});
