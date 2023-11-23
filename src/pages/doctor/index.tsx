import { Routes, Route, Navigate } from "react-router-dom";
import { DoctorURL } from "../../utils/path";
import { AppBarComp } from "../../components/appBar";

export const DoctorRoot = () => {
  const renderRoutes = () => {
    return DoctorURL.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ));
  };

  return (
    <>
      <AppBarComp name="Доктор" />
      <Routes>
        {renderRoutes()}
        <Route path="/error" element={<></>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
