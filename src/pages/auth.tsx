import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AuthFields } from "../widgets/authForm";

export const AuthPage = () => {
  const [nav, setNav] = useState<string>("Пациент");

  const handleChange = (event: any, newVal: any) => setNav(newVal);

  return (
    <div className="flex flex-col justify-center w-80 mx-auto">
      <Tabs onChange={handleChange} value={nav} centered>
        <Tab label="Пациент" value="Пациент" />
        <Tab label="Врач" value="Врач" />
      </Tabs>

      <AuthFields name={nav} />

      <Button variant="contained">Войти</Button>
    </div>
  );
};
