import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { client } from "../../..";
import { RecorderVoiceItem } from "../../../widgets/record";
import { AppBarComp } from "../../../components/appBar";
import { observer } from "mobx-react-lite";

const data = [
  { name: "ФИО", value: "" },
  { name: "Специализация", value: "" },
];

export const DoctorCardPage = () => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const handleClose = () => setIsOpen(!isOpen);
  return (
    <>
      <AppBarComp name="Пациент" />

      {/* {isOpen && <PatientDialog open={isOpen} handleClose={handleClose} />} */}
      <div className="px-5">
        <span style={{ fontSize: "36px" }} className="my-5">
          Информация о враче
        </span>
        <ProfileCard />
        <div className="flex justify-between w-full">
          <span>Сеансы оценки качества речи</span>
          <Button
            variant="contained"
            onClick={handleClose}
            size="large"
            sx={{ px: 3, py: 1, borderRadius: "10px" }}
          >
            Добавить пациента
          </Button>
        </div>
      </div>
    </>
  );
};

const ProfileCard = () => {
  useEffect(() => {
    (async () => {
      client.getDoctors();
    })();
  }, []);

  return (
    <div
      className="p-10"
      style={{
        maxWidth: "300px",
        border: "1px solid silver",
        borderRadius: "8px",
      }}
    >
      {/* {(
        data.map((item: any) => (
          <>
            <span>{item.name}: </span>
            <span>{item.value}</span>
            <br />
          </>
        ))
      ) : (
        <div>
          Произошла серверная ошибка! Невозвожно получить карточку врача!
        </div>
      )} */}
    </div>
  );
};
