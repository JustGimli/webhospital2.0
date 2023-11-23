import { AuthPage } from "../pages/auth";
import {  DoctorRoot } from "../pages/doctor";
import { DoctorMainPage } from "../pages/doctor/views/doctorMain";
import { PatientCardPage } from "../pages/doctor/views/patientCard";
import { AUTH, DOCTOR, DOCTORBASE,  PATIENTCARD } from "./const";


export const MainURL = [
  {
    Component: AuthPage,
    path: AUTH,
  },
    {
      Component: DoctorRoot,
      path: DOCTOR,
    }
  //   {
  //     Component: PolicyPage,
  //     path: PATIENT,
  //   },
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