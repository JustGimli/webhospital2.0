import { IconButton, Button } from "@mui/material";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import MicIcon from "@mui/icons-material/Mic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import { doctor } from "..";

export const RecorderVoiceItem = ({ speechId, handleButtonNext }) => {
  const { patientID } = useParams();
  const [phrases, setPhrases] = useState([]);
  const [index, setIndex] = useState(1);

  const [isMic, setisMic] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
  };

  useEffect(() => {
    (async () => {
      const res = await doctor.getExampleSpeech(patientID, speechId);

      if (speechId.session_type === "слог") {
        setPhrases(res.syllables);
      } else {
        setPhrases(res.phrases);
      }
    })();
  }, []);

  const handleIndex = () => {
    if (index + 1 > phrases.length) {
      handleButtonNext();
    }
    setIndex(index + 1);
    setisMic(!isMic);
  };

  return (
    <>
      <div>
        Фраза {index}/{phrases.length}: {phrases[index - 1]}
      </div>
      {isMic ? (
        <>
          <RecordVoice
            speechId={speechId}
            handleIndex={handleIndex}
            real_val={phrases[index - 1]}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <div className="mt-4">
            <IconButton onClick={() => setisMic(!isMic)}>
              <MicIcon />
            </IconButton>
          </div>
          <div className="my-3">или</div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={onFileChange}
              accept=".wav"
            />
          </Button>
        </div>
      )}
    </>
  );
};

const RecordVoice = ({ speechId, handleIndex, real_val }) => {
  const [recordState, setRecordState] = useState(RecordState.NONE);

  const start = () => {
    try {
      setRecordState(RecordState.START);
    } catch (error) {
      setRecordState(RecordState.START);
      console.error("Error starting recording:", error);
    }
  };

  const stop = () => {
    try {
      setRecordState(RecordState.STOP);
      handleIndex();
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const onStop = async (audioData) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Data = reader.result;

      const [, base64] = base64Data.split(",");

      const data = {
        speech_type:
          speechId.session_type === "фраз"
            ? speechId.session_type + "а"
            : speechId.session_type,
        base64_value: base64,
        base64_value_segment: "",
        real_value: real_val,
      };

      await doctor.updateSessionSpeech(speechId, data);
    };

    reader.readAsDataURL(audioData.blob);
  };

  return (
    <div>
      <div className="flex justify-center">
        <AudioReactRecorder
          state={recordState}
          onStop={onStop}
          canvasHeight={150}
          canvasWidth="400%"
          backgroundColor="white"
        />
      </div>
      <div className="flex justify-center">
        {recordState === RecordState.START ? (
          <IconButton onClick={stop}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={start}>
            <FiberManualRecordIcon color="inherit" style={{ color: "red" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
