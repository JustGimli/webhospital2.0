import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export const SessionList = ({ sessions }: any) => {
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
            {sessions.map((row: any) => (
              <TableRow
                key={row.session_id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick()}
              >
                <TableCell>{row.session_id}</TableCell>
                <TableCell>
                  {row.is_reference_session ? "Эталонная" : "Неэталлоная"}
                </TableCell>
                <TableCell>{row.session_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
