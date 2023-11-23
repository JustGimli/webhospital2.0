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

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [pass, setPass] = useState();
  const [gender, setGender] = useState(null);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword: any) => !showPassword);

  const handleClick = () => {
    const form = new FormData();
    form.append("full_name", name);
    // form.append("date_of_birth", date);
    handleClose();
  };

  const handleDateChange = (selectedDate: any) => {
    if (selectedDate !== null) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDate(formattedDate);
    } else {
      // Если дата была очищена, устанавливаем пустую строку
      setDate("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить нового пациента</DialogTitle>
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
            <DatePicker
              label="Дата рождения"
              sx={{ width: "100%" }}
              value={date}
              format="YYYY-MM-DD"
              onChange={handleDateChange}
            />
          </div>

          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel>Пол</InputLabel>
            <Select
              onChange={(e: any) => {
                setGender(e.target.value);
              }}
              label="Пол"
              style={{
                borderRadius: "15px",
                background: "#F8FAFC",
                width: isMobile ? "100%" : "",
              }}
              value={gender}
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
        <Button onClick={handleClick} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
