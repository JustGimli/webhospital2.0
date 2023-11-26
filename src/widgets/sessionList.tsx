import {
  IconButton,
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

export const SessionList = ({ speechList }: any) => {
  const { patientID } = useParams();
  const navigate = useNavigate();

  const handleClick = (sessionID: any) => {
    navigate(DOCTORROOT + "/card/" + patientID + "/" + sessionID);
  };

  const handleCompare = () => {};

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
