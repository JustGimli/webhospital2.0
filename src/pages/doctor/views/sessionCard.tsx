import {
  Button,
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
import {
  ShowErrorToastMessage,
  ShowSuccessToastMessage,
} from "../../../utils/toasts";
import { PhraseChart } from "../../../widgets/phraseChart";
import { SlogChart } from "../../../widgets/slogChart";

export const SessionCard = () => {
  const { patientID, session, type } = useParams();
  const [sessionsData, setData] = useState(null);
  const [openChartPhrases, setOpenChartPrases] = useState<boolean>(false);
  const [openChartSlog, setOpenChartSlog] = useState<boolean>(false);

  useEffect(() => {
    const promise = new Promise<any>((resolve) => {
      const res = doctor.getPatientSessionInfo(patientID, session);
      resolve(res);
    });
    promise.then((result) => {
      setData(result);
    });
  }, []);

  const handlePhrases = () => {
    setOpenChartPrases(true);
  };
  const handleSlog = () => {
    setOpenChartSlog(true);
  };
  const handleCloseChart = () => {
    setOpenChartPrases(false);
    setOpenChartSlog(false);
  };

  const handleEstimate = async () => {
    const res = doctor.estimateSpeech(patientID, session);

    if (Object.keys(res).length === 0) {
      ShowErrorToastMessage();
    } else {
      ShowSuccessToastMessage("Оценка займет некоторое время");
    }
  };

  return (
    <div className="mx-10">
      {openChartPhrases && (
        <PhraseChart
          handleCloseChart={handleCloseChart}
          open={openChartPhrases}
          sessionsData={sessionsData}
        />
      )}
      {openChartSlog && (
        <SlogChart
          handleCloseChart={handleCloseChart}
          open={openChartSlog}
          sessionsData={sessionsData}
        />
      )}
      <div style={{ color: "#1976d2" }} className="my-5">
        Индендефикатор сеанса: {session}
      </div>
      <div
        className="flex justify-between my-5"
        style={{ alignItems: "center" }}
      >
        <div style={{ fontSize: "36px" }} className="font-bold">
          Тип биологического сигнала: {type}
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={type == "фразы" ? handlePhrases : handleSlog}
            size="large"
            sx={{ px: 3, py: 1, borderRadius: "10px", marginRight: "10px" }}
          >
            {type == "фразы" ? "График фраз" : "График слогов"}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleEstimate}
            size="large"
            sx={{ px: 3, py: 1, borderRadius: "10px" }}
          >
            Оценить
          </Button>
        </div>
      </div>

      <SessionTable />
    </div>
  );
};

const SessionTable = () => {
  const [data, setData] = useState({ speech_array: [] });
  const [isLoading, setisLoading] = useState(false);
  const { patientID, session } = useParams();
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const d1 = await doctor.getPatientSessionInfo(patientID, session);
      setData(d1);
      setisLoading(false);
    })();
  }, []);

  const handleDownload = async (phrase: any) => {
    const res = await doctor.getSpeech(patientID, session, phrase);

    const blob = new Blob(
      [
        new Uint8Array(
          atob(res.base64_value)
            .split("")
            .map((c) => c.charCodeAt(0))
        ),
      ],
      {
        type: "audio/wav",
      }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audio_${phrase}.wav`;

    a.click();

    URL.revokeObjectURL(url);
    a.remove();
  };

  const handlePlay = async (phrase: any) => {
    const res = await doctor.getSpeech(patientID, session, phrase);

    setAudioSrc("data:audio/wav;base64," + res.base64_value);
    setIsPlaying(true);
  };

  return isLoading ? (
    <div className="flex justify-center w-full">
      <CircularProgress />
    </div>
  ) : Object.keys(data).length === 0 ? (
    <div className="flex justify-center w-full">Сеансы отсутсвуют!</div>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Индендефикатор</TableCell>
              <TableCell>Реальная значение</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.speech_array.map((row: any) => (
              <TableRow key={row.signal_id} style={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {row.signal_id}
                </TableCell>
                <TableCell>{row.real_value}</TableCell>
                <TableCell>{row.signal_type}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handlePlay(row.signal_id)}>
                    <PlayCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDownload(row.signal_id)}>
                    <FileDownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPlaying && (
        <audio autoPlay onEnded={() => setIsPlaying(false)} src={audioSrc}>
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
};
