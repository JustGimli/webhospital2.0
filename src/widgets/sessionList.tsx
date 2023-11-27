import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { DOCTORROOT } from "../utils/const";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useState } from "react";
import { doctor } from "..";

export const SessionList = ({ speechList }: any) => {
  const { patientID } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<any>();

  const handleClick = (sessionID: any) => {
    navigate(DOCTORROOT + "/card/" + patientID + "/" + sessionID);
  };

  const handleCompare = (e: any) => {
    e.stopPropagation();
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <DialogComponent
          open={isOpen}
          handleClose={handleClose}
          speechList={speechList}
          patientID={patientID}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Индондефикатор сессии</TableCell>
              <TableCell>Тип сигнала</TableCell>
              <TableCell>Тип сеанса</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {speechList.map((row: any) => (
              <TableRow
                key={row.session_id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(row.session_id)}
              >
                <TableCell>{row.session_id}</TableCell>
                <TableCell>
                  {row.is_reference_session ? "Эталонная" : "Неэталлоная"}
                </TableCell>
                <TableCell>{row.session_type}</TableCell>
                <TableCell>
                  <IconButton onClick={handleCompare}>
                    <CompareArrowsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const DialogComponent = ({ open, handleClose, speechList, patientID }: any) => {
  const [first, setFirst] = useState<any>();

  const [second, setSecond] = useState<any>();

  const handleEstimate = async () => {
    const data = {
      sessions_id: [first, second],
    };

    await doctor.estimatePhrase(patientID, data);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Выбрать 1-2 сеансы для сравнения</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel>1 сеанс</InputLabel>
            <Select
              value={first}
              onChange={(e: any) => {
                setFirst(e.target.value);
              }}
              label="1 сеанс"
            >
              {speechList.map((row: any) => (
                <MenuItem value={row.session_id}>{row.session_id}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel>2 сеанс</InputLabel>
            <Select
              value={second}
              onChange={(e: any) => {
                setSecond(e.target.value);
              }}
              label="2 сеанс"
            >
              {speechList.map((row: any) => (
                <MenuItem value={row.session_id}>{row.session_id}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            sx={{ px: 3, py: 1, borderRadius: "10px" }}
            variant="contained"
            onClick={handleEstimate}
            style={{ marginRight: "40%" }}
          >
            Сравнить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
