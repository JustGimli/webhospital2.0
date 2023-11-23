import { Routes, Route, Navigate } from "react-router-dom";
import { DoctorURL } from "../../utils/path";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { user } from "../..";

export const DoctorRoot = () => {
  const renderRoutes = () => {
    return DoctorURL.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ));
  };

  return (
    <>
      <DoctorAppBar />
      <Routes>
        {renderRoutes()}
        <Route path="/error" element={<></>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

const DoctorAppBar = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <span style={{ flexGrow: 1 }}>Доктор</span>
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
