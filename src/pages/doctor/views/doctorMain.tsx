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
import SearchBar from "material-ui-search-bar";
import { AddPatient } from "../../../widgets/patientForm";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { doctor } from "../../..";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    const filteredRows = data.filter((row: any) => {
      return row.full_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const d1 = await doctor.getPatients();
      setData(d1);
      setRows(d1);
      setIsLoading(false);
    })();
  }, []);
  return isLoading ? (
    <div className="flex justify-center w-full">
      <CircularProgress />
    </div>
  ) : data.length === 0 ? (
    <div className="flex justify-center w-full">Пациенты отсутсвуют</div>
  ) : (
    <>
      <Paper />
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        style={{
          maxWidth: "400px",
          border: "1px solid grey",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
          margin: "5px",
        }}
      />
      <TableItem data={rows} />
    </>
  );
};

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
            <TableCell align="right">Полное имя</TableCell>
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
              <TableCell align="right">{row.gender}</TableCell>
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

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
