import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { doctor } from "../../..";
import { useParams } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const SessionCard = () => {
  const { patientID, session } = useParams();

  return (
    <div>
      <div>Индодефикатор сеанса: {session}</div>
      <div>Тип биологического сигнала: фразы </div>

      <SessionTable />
    </div>
  );
};

const SessionTable = () => {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { patientID, session } = useParams();

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const d1 = await doctor.getPatientSessionInfo(patientID, session);
      setData(d1);
      //   await doctor.getSpeech(patientID, session);
      setisLoading(false);
    })();
  }, []);

  const handleDowload = () => {};

  const handlePlay = () => {};

  return isLoading ? (
    <div className="flex justify-center w-full">
      <CircularProgress />
    </div>
  ) : Object.keys(data).length === 0 ? (
    <div className="flex justify-center w-full">
      Врачи отсутсвуют! Обратитесь в больницу для записи к врачу.
    </div>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Индодефикатор</TableCell>
              <TableCell align="right">Реальная значение</TableCell>
              <TableCell align="right">Тип</TableCell>
              <TableCell align="right">
                <IconButton onClick={handlePlay}>
                  <PlayCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={handleDowload}>
                  <FileDownloadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {tabledata.data.map((row: any) => (
              <TableRow
                key={row.card_number}
                style={{ cursor: "pointer" }}
                // onClick={() => handleClick(row.card_number)}
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
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
