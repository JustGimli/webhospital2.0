import { AppBar, IconButton, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { observer } from "mobx-react-lite";
import { client, doctor } from "..";
import { useNavigate } from "react-router-dom";

export const AppBarComp = observer(({ name }: any) => {
  const navigate = useNavigate();
  const handelClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <span style={{ flexGrow: 1, fontSize: 30, fontWeight: 600 }}>
            {name}
          </span>
          <div className="flex justify-between items-center">
            <span style={{ marginRight: 10, fontSize: 20 }}>
              {name === "Доктор"
                ? doctor.name
                : client.card != ""
                ? "№ " + client.card
                : client.card}
            </span>
            <IconButton color="inherit" onClick={handelClick}>
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
});
