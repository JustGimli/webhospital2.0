import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AuthFields } from "../widgets/authForm";

export const AuthPage = () => {
  const [nav, setNav] = useState<string>("Пациент");

  const handleChange = (event: any, newVal: any) => setNav(newVal);

  return (
    <div style={{ maxWidth: "600px" }} className="mx-auto my-20">
      <div className="flex flex-col justify-center">
        <Tabs onChange={handleChange} value={nav} centered>
          <Tab label="Пациент" value="Пациент" />
          <Tab label="Врач" value="Врач" />
        </Tabs>

        <AuthFields name={nav} />

        <Button fullWidth variant="contained">
          Войти
        </Button>
      </div>
    </div>
  );
};
