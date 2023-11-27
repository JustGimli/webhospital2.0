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
import React, { useEffect, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { client, doctor } from "../../..";
import { RecorderVoiceItem } from "../../../widgets/record";
import { AppBarComp } from "../../../components/appBar";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const data = [
  { name: "ФИО", value: "" },
  { name: "Специализация", value: "" },
];

export const DoctorCardPage = observer(() => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      <AppBarComp name="Пациент" />

      {isOpen && (
        <PatientDialog
          card={client.card}
          open={isOpen}
          handleClose={handleClose}
        />
      )}
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
            Добавить сеанс
          </Button>
        </div>
      </div>
    </>
  );
});

const ProfileCard = observer(() => {
  const [doctor, setDoctor] = useState({
    doctor_name: "",
    doctor_specialization: "",
  });
  useEffect(() => {
    (async () => {
      const res: any = await client.getDoctors();

      setDoctor(res[client.doctorId]);
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
      <div>
        <span>
          <b>ФИО: </b>
        </span>
        <span>{doctor.doctor_name}</span>
      </div>
      <div>
        <span>
          <b>Специализация: </b>
        </span>
        <span>{doctor.doctor_specialization}</span>
      </div>
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
});
const PatientDialog = ({ open, handleClose, card }: any) => {
  const [step, setStep] = useState<any>(0);

  const [is_reference_session, setIsRef] = useState(1);
  const [session_type, setSessionType] = useState("фразы");
  const [speech, setSpeech] = useState<any>(null);

  const handleButtonNext = async () => {
    if (step === 0) {
      const sp = await client.createSession(session_type);
      setSpeech({ ...sp, session_type: session_type, sessionPatient: card });
    }

    setStep(step + 1);

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
              <IputType
                setIsRef={setIsRef}
                setSessionType={setSessionType}
                session_type={session_type}
              />
            </>
          ) : speech === 1 ? (
            <>
              <RecorderVoiceItem
                speechId={speech}
                handleButtonNext={handleButtonNext}
              />
            </>
          ) : (
            <>Вы записали все речи</>
          )}
        </DialogContent>
        <DialogActions>
          {step === 0 ? (
            <Button onClick={handleButtonNext} variant="contained">
              Вперед
            </Button>
          ) : (
            <Button onClick={handleButtonNext} variant="contained">
              Завершить
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
const IputType = ({ setIsRef, setSessionType, session_type }: any) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сеанса</InputLabel>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сигнала</InputLabel>
        <Select
          value={session_type}
          onChange={(e: any) => {
            setSessionType(e.target.value);
          }}
          label="Тип сигнала"
        >
          <MenuItem value="фразы">Фразы</MenuItem>
          <MenuItem value="слоги">Слоги</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
const steps = ["Добавление сеанса", "Загрузка аудио", "Завершение"];
