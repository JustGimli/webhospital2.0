import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AuthFields } from "../widgets/authForm";
import { doctor } from "..";
import { async } from "q";
import { useNavigate } from "react-router-dom";
import { DOCTORROOT } from "../utils/const";

export const AuthPage = () => {
  const navigate = useNavigate();

  const [nav, setNav] = useState<string>("Пациент");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = async () => {
    setDisabled(true);
    if (username.length !== 0 && password.length !== 0) {
      const flag = await doctor.login(username, password);

      console.log(flag);
      if (flag === true) {
        navigate(DOCTORROOT);
      }
    }
    setDisabled(false);
  };

  const handleChange = (event: any, newVal: any) => setNav(newVal);

  return (
    <div className="flex flex-col justify-center w-80 mx-auto my-10">
      <Tabs onChange={handleChange} value={nav} centered>
        <Tab label="Пациент" value="Пациент" />
        <Tab label="Врач" value="Врач" />
      </Tabs>

      <AuthFields
        name={nav}
        username={username}
        password={password}
        setUserName={setUserName}
        setPassword={setPassword}
      />

      <Button variant="contained" onClick={handleClick} disabled={disabled}>
        Войти
      </Button>
    </div>
  );
};
