import { AuthPage } from "../pages/auth";
import { DoctorRoot } from "../pages/doctor";
import { DoctorMainPage } from "../pages/doctor/views/doctorMain";
import { PatientCardPage } from "../pages/doctor/views/patientCard";
import { ClientMain } from "../pages/client/views/client";
import { DoctorCardPage } from "../pages/client/views/doctorCard";
import {
  AUTH,
  DOCTOR,
  DOCTORBASE,
  PATIENT,
  PATIENTBASE,
  PATIENTCARD,
  DOCTORCARD,
  CHANGEPASS,
} from "./const";
import { ChangePassPage } from "../pages/client/views/changePass";
import { PatientRoot } from "../pages/client";

export const MainURL = [
  {
    Component: AuthPage,
    path: AUTH,
  },
  {
    Component: DoctorRoot,
    path: DOCTOR,
  },
  {
    Component: PatientRoot,
    path: PATIENT,
  },
];

export const DoctorURL = [
  {
    Component: DoctorMainPage,
    path: DOCTORBASE,
  },
  {
    Component: PatientCardPage,
    path: PATIENTCARD,
  },

  //   {
  //     Component: PolicyPage,
  //     path: PATIENT,
  //   },
];

export const PatientURL = [
//   {
//     Component: ClientMain,
//     path: PATIENTBASE,
//   },
//   {
//     Component: DoctorCardPage,
//     path: DOCTORCARD,
//   },
{
    Component: ChangePassPage,
     path: CHANGEPASS,
},


];
