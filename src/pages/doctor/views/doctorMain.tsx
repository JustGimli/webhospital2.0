import { useEffect, useState } from "react";

import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddPatient } from "../../../widgets/patientForm";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { doctor } from "../../..";
import { observer } from "mobx-react-lite";

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

const DockerTable = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const d1 = await doctor.getPatients();
      setData(d1);
      setRows(d1);
      setIsLoading(false);
    })();
  }, [doctor.isUpdatePatient]);
  return isLoading ? (
    <div className="flex justify-center w-full">
      <CircularProgress />
    </div>
  ) : data.length === 0 ? (
    <div className="flex justify-center w-full">Пациенты отсутсвуют</div>
  ) : (
    <>
      <TableItem data={rows} />
    </>
  );
});

const TableItem = (tabledata: any) => {
  const handleClick = (number: any) => {
    navigate("/doctor/card/" + number);
  };

  const navigate = useNavigate();
  return tabledata.length === 0 ? (
    <div className="flex justify-center w-full">Пациенты отсутсвуют</div>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Полное имя</TableCell>
            <TableCell align="right">Возраст</TableCell>
            <TableCell align="right">Пол</TableCell>
            <TableCell align="right">Номер личной карты</TableCell>
            <TableCell align="right">Информация</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.data.map((row: any) => (
            <TableRow
              key={row.card_number}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(row.card_number)}
            >
              <TableCell component="th" scope="row">
                {row.full_name}
              </TableCell>
              <TableCell align="right">{row.date_of_birth}</TableCell>
              <TableCell align="right">
                {row.gender === "m" ? "Мужской" : "Женский"}
              </TableCell>
              <TableCell align="right">{row.card_number}</TableCell>
              <TableCell align="right">
                {row.doctor_info.map((item: any) => (
                  <span key={item}>{item} </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
