import { Routes, Route, Navigate } from "react-router-dom";
import { DoctorURL } from "../../utils/path";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar } from "@mui/material";

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
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </>
);
