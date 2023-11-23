import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export const AuthFields = ({
  name,
  username,
  password,
  setUserName,
  setPassword,
}: any) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const [showPassword, setShowPassword] = useState<any>(false);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword: any) => !showPassword);

  return (
    <>
      <span className="AuthTitle  my-20">Вход {name}а</span>
      <FormControl
        style={{
          marginBottom: isMobile ? "20px" : "40px",
        }}
        variant="outlined"
        fullWidth
        required
      >
        <InputLabel>Логин</InputLabel>
        <OutlinedInput
          style={{
            borderRadius: "15px",
            background: "#F8FAFC",
            width: isMobile ? "100%" : "",
          }}
          type="email"
          onChange={(e: any) => setUserName(e.target.value)}
          value={username}
          label="Логин"
        />
      </FormControl>
      <FormControl
        required
        variant="outlined"
        fullWidth
        style={{
          marginBottom: isMobile ? "20px" : "40px",
        }}
      >
        <InputLabel>Пароль</InputLabel>
        <OutlinedInput
          style={{
            borderRadius: "15px",
            background: "#F8FAFC",
            width: isMobile ? "100%" : "",
          }}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Пароль"
        />
      </FormControl>
    </>
  );
};
