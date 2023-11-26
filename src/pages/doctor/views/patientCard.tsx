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

import { useParams } from "react-router-dom";
import { doctor } from "../../..";
import { SessionList } from "../../../widgets/sessionList";
import { RecorderVoiceItem } from "../../../widgets/record";

export const PatientCardPage = () => {
  const [patient, setPatient] = useState<any>();
  const [speechList, setSpeechList] = useState<any>();
  const { patientID } = useParams();

  useEffect(() => {
    (async () => {
      const res = await doctor.getPatient(Number(patientID));
      if (res) {
        setPatient(res.get_patient_info);
        setSpeechList(res.sessions);
      }
      // const response = sessions.map(async (s: any)=>{
      //   return await doctor.getPatientSessionInfo(patient.card_number,s.session_id);
      // })
      // setSessionsInfo(response);
    })();
  }, []);

  const [isOpen, setIsOpen] = useState<any>(false);

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && (
        <PatientDialog
          card={patientID}
          open={isOpen}
          handleClose={handleClose}
        />
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
        {speechList ? (
          <SessionList speechList={speechList} />
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
          <div key={key}>
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

  const [is_reference_session, setIsRef] = useState(1);
  const [session_type, setSessionType] = useState("фразы");
  const [speech, setSpeech] = useState<any>(null);

  const handleButtonNext = async () => {
    if (step === 0) {
      const sp = await doctor.createScenario(
        card,
        is_reference_session,
        session_type
      );
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
                is_reference_session={is_reference_session}
                session_type={session_type}
              />
            </>
          ) : speech === 1 ? (
            <>
              <RecorderVoiceItem session={speech} />
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

const IputType = ({
  setIsRef,
  setSessionType,
  is_reference_session,
  session_type,
}: any) => {
  return (
    <>
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel>Тип сеанса</InputLabel>
        <Select
          value={is_reference_session}
          onChange={(e: any) => {
            setIsRef(e.target.value);
          }}
          label="Тип сигнала"
        >
          <MenuItem value={1}>Эталонный</MenuItem>

          <MenuItem value={0}>Не эталонный</MenuItem>
        </Select>
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
