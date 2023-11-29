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
import { client, doctor } from "../../..";
import { RecorderVoiceItem } from "../../../widgets/recordClient";
import { AppBarComp } from "../../../components/appBar";
import { observer } from "mobx-react-lite";
import { SessionList } from "../../../widgets/sessionList";

export const DoctorCardPage = observer(() => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [speechList, setSpeechList] = useState<any>([]);

  useEffect(() => {
    console.log(client.card);
    (async () => {
      const res = await doctor.getPatient(Number(client.card));
      if (res) {
        setSpeechList(res.sessions);
        console.log(speechList);
      }
    })();
  }, []);

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
        <span style={{ fontSize: "36px", fontWeight: 600 }} className="my-5">
          Информация о враче
        </span>
        <ProfileCard />
        <div className="flex justify-between w-full">
          <span style={{ paddingTop: 10, fontSize: 20, fontWeight: 400 }}>
            Сеансы оценки качества речи
          </span>
          <Button
            variant="contained"
            onClick={handleClose}
            size="large"
            sx={{ px: 3, py: 1, borderRadius: "10px" }}
          >
            Добавить сеанс
          </Button>
          {speechList.length ? (
            <SessionList speechList={speechList} name="cl" />
          ) : (
            <span style={{ fontSize: 16 }}>Сеансы отсутсвуют</span>
          )}
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
      <div style={{ marginBottom: 10 }}>
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
    </div>
  );
});
const PatientDialog = ({ open, handleClose, card }: any) => {
  const [step, setStep] = useState<any>(0);
  const [is_reference_session, setIsRef] = useState(1);
  const [session_type, setSessionType] = useState("фразы");
  const [speech, setSpeech] = useState<any>();

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
                is_reference_session={is_reference_session}
              />
            </>
          ) : step === 1 ? (
            <>
              <RecorderVoiceItem
                speechId={speech}
                handleButtonNext={handleButtonNext}
                patientID={client.card}
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
const IputType = ({
  setIsRef,
  setSessionType,
  session_type,
  is_reference_session,
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
