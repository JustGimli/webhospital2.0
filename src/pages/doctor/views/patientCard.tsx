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

  const { number: card } = useParams();

  useEffect(() => {
    (async () => {
      const res = await doctor.getPatient(Number(card));
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
      {isOpen && (
        <PatientDialog card={card} open={isOpen} handleClose={handleClose} />
      )}
      <div className="px-5">
        <span style={{ fontSize: "24px" }} className="my-5">
          Профиль пациента
        </span>
        <ProfileCard patient={patient} />
        <div className="flex justify-between w-full my-5">
          <span>Сеансы оценки качества речи</span>
          <Button variant="contained" onClick={handleClose}>
            Добавить сеанс
          </Button>
        </div>
        {sessions ? (
          <SessionList sessions={sessions} />
        ) : (
          <span>Сеансы отсутсвуют</span>
        )}
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

const PatientDialog = ({ open, handleClose, card }: any) => {
  const [step, setStep] = useState<any>(0);

  const [is_reference_session, setIsRef] = useState();
  const [session_type, setSessionType] = useState("");
  const [speech, setSpeech] = useState<any>(null);

  const handleButtonNext = () => {
    if (step === 0) {
      setSpeech(
        doctor.createScenario(card, is_reference_session, session_type)
      );
    }

    setStep(step + 1);

    if (step === 2) {
      setStep(0);
      handleClose();
    }
  };

  //   const Upload = () => {
  //     const id = useId();
  //     return (
  //       <label htmlFor={id}>
  //         <input type="file" id={id} />
  //       </label>
  //     );
  //   };

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
              <RecorderVoice
                sessionType={session_type}
                speech={speech}
                card={card}
              />
              {/* <p style={{ textAlign: "center", fontSize: "14" }}>или</p>
              <Upload /> */}
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

const RecorderVoice = (sessionType: any, speech: any, card: any) => {
  const addAudioElement = async (blob: Blob) => {
    // const base64Value = await blobToBase64(blob);
    // // Prepare the data to be sent to the server
    // const data = {
    //   speech_type: sessionType,
    //   base64_value: base64Value,
    //   base64_value_segment: "",
    //   real_value: "кась",
    // };
    // await doctor.updateScenario(card, speech, data);
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

const blobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(",")[1];
      resolve(base64data);
    };
    reader.onerror = (error) => reject(error);
  });
};
