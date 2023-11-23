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
import { useParams } from "react-router-dom";
import { doctor } from "../../..";

export const PatientCardPage = () => {
  const [patient, setPatient] = useState<any>();
  const [sessions, setSessions] = useState<any>();

  const { number } = useParams();

  useEffect(() => {
    (async () => {
      const res = await doctor.getPatient(Number(number));
      if (res) {
      }
    })();
  }, []);

  const [isOpen, setIsOpen] = useState<any>(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && <PatientDialog open={isOpen} handleClose={handleClose} />}
      <div className="px-5">
        <span style={{ fontSize: "24px" }}>Профиль пациента</span>
        <ProfileCard />
        <div className="flex justify-between w-full">
          <span>Сеансы оценки качества речи</span>
          <Button variant="contained" onClick={handleClose}>
            Добавить сеанс
          </Button>
        </div>
      </div>
    </>
  );
};

const ProfileCard = () => {
  return (
    <div
      className="p-10"
      style={{
        maxWidth: "300px",
        border: "1px solid silver",
        borderRadius: "8px",
      }}
    >
      {data.map((item) => (
        <>
          <span>{item.name}: </span>
          <span>{item.value}</span>
          <br />
        </>
      ))}
    </div>
  );
};

const data = [
  { name: "Имя", value: "" },
  { name: "Возраст", value: "" },
  { name: "Персональный номер карты", value: "" },
  { name: "Пол", value: "" },
  { name: "Дополнительная информация", value: "" },
];

const PatientDialog = ({ open, handleClose }: any) => {
  const [step, setStep] = useState<any>(0);

  const handleButtonNext = () => {
    setStep(step + 1);
    console.log(step);
    if (step === 2) {
      setStep(0);
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Stepper activeStep={step}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent>
          {step === 0 ? (
            <>
              <IputType />
            </>
          ) : (
            <>
              <RecorderVoice />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {step === 0 ? (
            <Button onClick={handleButtonNext}>Вперед</Button>
          ) : (
            <Button onClick={handleButtonNext}>Завершить</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const steps = ["Добавление сеанса", "Загрузка аудио", "Завершение"];

const RecorderVoice = () => {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />
    </>
  );
};

const IputType = () => {
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сеанса</InputLabel>
        <Select onChange={() => {}} label="Тип сигнала">
          <MenuItem value="Мужской">Эталонный</MenuItem>

          <MenuItem value="Женский">Не эталонный</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Тип сигнала</InputLabel>
        <Select onChange={() => {}} label="Тип сигнала">
          <MenuItem value="Мужской">Фразы</MenuItem>
          <MenuItem value="Женский">Слоги</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
