import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export const SessionList = () => {
  const handleClick = () => {};

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Индондефикатор сессии</TableCell>
              <TableCell>Тип сигнала</TableCell>
              <TableCell>Тип сеанса</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.data.map((row: any) => (
              <TableRow
                key={row.full_name}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick()}
              >
                <TableCell component="th" scope="row">
                  {row.full_name}
                </TableCell>
                <TableCell align="right">{row.date_of_birth}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.card_number}</TableCell>
                <TableCell align="right">
                  {row.doctor_info.map((item: any) => (
                    <span>{item} </span>
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
