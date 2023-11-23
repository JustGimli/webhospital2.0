import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export const AuthFields = ({ name }: any) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const [showPassword, setShowPassword] = useState<any>(false);

  return (
    <>
      <span className="AuthTitle  my-20">Вход {name}а</span>

      <FormControl
        style={{
          marginBottom: isMobile ? "20px" : "40px",
        }}
        fullWidth={true}
      >
        <OutlinedInput
          notched={false}
          placeholder="Email"
          type="email"
          //   onChange={(e: any) => handleEmail(e.target.value)}
          //   value={email}
          className="AuthInput"
        />
      </FormControl>

      <FormControl
        fullWidth={true}
        style={{
          marginBottom: isMobile ? "10px" : "20px",
          color: "white",
        }}
      >
        <OutlinedInput
          label="Пароль"
          placeholder="fd"
          className="AuthInput"
          //   value={password}
          //   onChange={(e: any) => handlePass(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show: any) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};
