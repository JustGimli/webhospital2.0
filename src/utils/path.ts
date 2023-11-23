import { AuthPage } from "../pages/auth";
import { DoctorPage } from "../pages/doctor";
import { AUTH, DOCTOR, PATIENT } from "./const";


export const MainURL = [
  {
    Component: AuthPage,
    path: AUTH,
  },
    {
      Component: DoctorPage,
      path: DOCTOR,
    },
  //   {
  //     Component: PolicyPage,
  //     path: PATIENT,
  //   },
];
