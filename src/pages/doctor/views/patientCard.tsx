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

import { useEffect, useId, useState } from "react";

import { AudioRecorder } from "react-audio-voice-recorder";
import { useParams } from "react-router-dom";
import { doctor } from "../../..";
import { SessionList } from "../../../widgets/sessionList";

export const PatientCardPage = () => {
  const [patient, setPatient] = useState<any>();
  const [sessions, setSessions] = useState<any>();

  const { number } = useParams();

  useEffect(() => {
    (async () => {
      const res = await doctor.getPatient(Number(number));
      if (res) {
        setPatient(res.get_patient_info);
        setSessions(res.sessions);
      }
    })();
  }, []);

  const [isOpen, setIsOpen] = useState<any>(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && <PatientDialog open={isOpen} handleClose={handleClose} />}
      <div className="px-5">
        <span style={{ fontSize: "24px" }} className="my-5">
          Профиль пациента
        </span>
        <ProfileCard patient={patient} />
        <div className="flex justify-between w-full">
          <span>Сеансы оценки качества речи</span>
          <Button variant="contained" onClick={handleClose}>
            Добавить сеанс
          </Button>
        </div>
        {sessions ? <SessionList /> : <span>Сеансы отсутсвуют</span>}
      </div>
    </>
  );
};

const ProfileCard = ({ patient }: any) => {
  return (
    <div
      className="p-10"
      style={{
        maxWidth: "300px",
        border: "1px solid silver",
        borderRadius: "8px",
      }}
    >
      {patient &&
        Object.entries(patient).map(([key, val]: any) => (
          <div>
            <span>{key}: </span>
            <span>{val}</span>
            <br />
          </div>
        ))}
    </div>
  );
};

const PatientDialog = ({ open, handleClose }: any) => {
  const [step, setStep] = useState<any>(0);

  const [is_reference_session, setIsRef] = useState();
  const [session_type, setSessionType] = useState("");

  const handleButtonNext = () => {
    if (step === 0) {
      doctor.createScenario(is_reference_session, session_type);
    }

    setStep(step + 1);

    if (step === 2) {
      setStep(0);
      handleClose();
    }
  };

  const Upload = () => {
    const id = useId();
    return (
      <label htmlFor={id}>
        <input type="file" id={id} />
      </label>
    );
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
              <IputType setIsRef={setIsRef} setSessionType={setSessionType} />
            </>
          ) : (
            <>
              <RecorderVoice />
              <p style={{ textAlign: "center", fontSize: "14" }}>или</p>
              <Upload />
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
          autoGainControl: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
        downloadOnSavePress
      />
    </>
  );
};

const IputType = ({ setIsRef, setSessionType }: any) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сеанса</InputLabel>
        <Select
          onChange={(e: any) => {
            console.log(e);
            setIsRef(e.target.value);
          }}
          label="Тип сигнала"
        >
          <MenuItem value="true">Эталонный</MenuItem>

          <MenuItem value="false">Не эталонный</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сигнала</InputLabel>
        <Select
          onChange={(e: any) => {
            console.log(e);
            setSessionType(e.target.value);
          }}
          label="Тип сигнала"
        >
          <MenuItem value="слоги">Фразы</MenuItem>
          <MenuItem value="фразы">Слоги</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

const steps = ["Добавление сеанса", "Загрузка аудио", "Завершение"];

const data = [
  { name: "Имя", value: "" },
  { name: "Возраст", value: "" },
  { name: "Персональный номер карты", value: "" },
  { name: "Пол", value: "" },
  { name: "Дополнительная информация", value: "" },
];
