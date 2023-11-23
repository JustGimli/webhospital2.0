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

  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [gender, setGender] = useState();

  const handleClickShowPassword = () =>
    setShowPassword((showPassword: any) => !showPassword);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <div className="mt-4">
          <FormControl
            variant="outlined"
            className="mb-4"
            fullWidth
            required
            margin="normal"
          >
            <InputLabel>ФИО</InputLabel>
            <OutlinedInput
              value={name}
              style={{
                borderRadius: "15px",
                background: "#F8FAFC",
                width: isMobile ? "100%" : "",
              }}
              onChange={(e: any) => setName(e.target.value)}
              label="ФИО"
            />
          </FormControl>

          <div
            style={{
              margin: isMobile ? "10px 0" : "20px 0",
            }}
          >
            <DatePicker label="Дата рождения" />
          </div>

          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel>Пол</InputLabel>
            <Select
              onChange={() => {}}
              label="Пол"
              style={{
                borderRadius: "15px",
                background: "#F8FAFC",
                width: isMobile ? "100%" : "",
              }}
            >
              <MenuItem value="Мужской">Мужской</MenuItem>

              <MenuItem value="Женский">Женский</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel>Пароль</InputLabel>
            <OutlinedInput
              style={{
                borderRadius: "15px",
                background: "#F8FAFC",
                width: isMobile ? "100%" : "",
              }}
              value={pass}
              onChange={(e: any) => setPass(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
