import { useState } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import { AddPatient } from "../../../widgets/patientForm";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";

export const DoctorMainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <AddPatient open={isOpen} handleClose={handleClose} />}

      <div className="flex w-full justify-end my-10 pe-5">
        <Button
          variant="contained"
          onClick={handleClose}
          size="large"
          sx={{ px: 3, py: 1, borderRadius: "10px" }}
        >
          Добавить пациента
        </Button>
      </div>
      <DockerTable />
    </>
  );
};

const DockerTable = () => {
  const navigate = useNavigate();

  const handleClick = (number: any) => {
    navigate("/doctor/card/" + number);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Полное имя</TableCell>
              <TableCell align="right">Полное имя</TableCell>
              <TableCell align="right">Возраст</TableCell>
              <TableCell align="right">Пол</TableCell>
              <TableCell align="right">Номер личной карты</TableCell>
              <TableCell align="right">Информация</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(1)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right" onClick={handleClick}>
                  {row.calories}
                </TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
