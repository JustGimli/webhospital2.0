import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { user } from "..";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBarComp } from "../components/appBar";

export const ClientPage = () => {
  return (
    <>
      <AppBarComp name="Пациент" />
      <DoctorsTable />
    </>
  );
};

const DoctorsTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setData(await user.getDoctors());
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <div className="flex justify-center w-full">
      <CircularProgress />
    </div>
  ) : data.length === 0 ? (
    <div className="flex justify-center w-full">
      Врачи отсутсвуют! Обратитесь в больницу для записи к врачу.
    </div>
  ) : (
    <TableItem data={data} />
  );
};

const TableItem = (data: any) => {
  const handleClick = (number: any) => {
    navigate("/doctors/card/" + number);
  };

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align="right">ФИО</TableCell>
            <TableCell align="right">Специализация</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.doctor_login}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(row.id)} //необходимо обозначить номер врача чтобы переходить к его карточке
            >
              <TableCell component="th" scope="row">
                {row.doctor_login}
              </TableCell>
              <TableCell align="right">{row.doctor_login}</TableCell>
              <TableCell align="right">{row.hospital}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
