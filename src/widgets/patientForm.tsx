import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const AddPatient = ({ open, handleClose }: any) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const [showPassword, setShowPassword] = useState<any>(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" className="mb-4" fullWidth={true}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            // error={status}
            // value={email}
            style={{
              borderRadius: "15px",
              background: "#F8FAFC",
            }}
            // onChange={(e: any) => setEmail(e.target.value)}
            label="Email"
          />
        </FormControl>
        <DatePicker label="Basic date picker" />

        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Пароль</InputLabel>
          <OutlinedInput
            style={{
              borderRadius: "15px",
              background: "#F8FAFC",
              width: isMobile ? "100%" : "",
            }}
            // value={password}
            // onChange={(e: any) => setPass(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  //   onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Пол</InputLabel>
          <Select onChange={() => {}} label="Пол">
            <MenuItem value="Мужской">Мужской</MenuItem>

            <MenuItem value="Женский">Женский</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};
