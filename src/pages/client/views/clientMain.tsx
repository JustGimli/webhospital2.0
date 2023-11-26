import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../..";
import { AppBarComp } from "../../../components/appBar";
import { PATIENTROOT } from "../../../utils/const";
import { observer } from "mobx-react-lite";

export const ClientMain = () => {
  return (
    <>
      <AppBarComp name="Пациент" />

      <div className="font-bold my-5 mx-2" style={{ fontSize: "24px" }}>
        Ваши врачи
      </div>
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
      const d1 = await client.getDoctors();
      setData(d1);
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

const TableItem = observer((data: any) => {
  const handleClick = (row: any, index: any) => {
    navigate(PATIENTROOT + "/card/" + index);
    client.doctorId = index;
  };

  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell>Специализация</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((row: any, index: any) => (
            <TableRow
              key={row.doctor_name}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(row, index)}
            >
              <TableCell component="th" scope="row">
                {row.doctor_name}
              </TableCell>
              <TableCell>{row.doctor_specialization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
