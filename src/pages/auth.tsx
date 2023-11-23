import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AuthFields } from "../widgets/authForm";
import {login_doctor, login_patient} from '../utils/api';
export const AuthPage = () => {
  const [nav, setNav] = useState<string>("Пациент");

  const handleChange = (event: any, newVal: any) => setNav(newVal);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  async function login(){
      console.log(nav)
      if(nav==='Пациент'){
          await login_patient(email,password)
      };
      if(nav==='Врач'){
          await login_doctor(email,password);
      }
  };
  return (
    <div className="flex flex-col justify-center w-80 mx-auto">
      <Tabs onChange={handleChange} value={nav} centered>
        <Tab label="Пациент" value="Пациент" />
        <Tab label="Врач" value="Врач" />
      </Tabs>

      <AuthFields setEmail={setEmail} setPassword={setPassword} name={nav} />

      <Button onClick={login}>Войти</Button>
    </div>
  );
};
