import { IconButton, Button } from "@mui/material";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import MicIcon from "@mui/icons-material/Mic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import { doctor } from "..";

export const RecorderVoiceItem = (session) => {
  const [isMic, setisMic] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
  };

  return isMic ? (
    <>
      <RecordVoice session={session} />
    </>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <div>
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
  );
};

const RecordVoice = (session) => {
  const [recordState, setRecordState] = useState(RecordState.NONE);

  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
  };

  const onStop = async (audioData) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Data = reader.result;

      const data = {
        speech_type: "слог",
        base64_value:
          "UklGRiwAAABXQVZFZm10IBAAAAABAAIAgLsAAADuAgAEABAAZGF0YQAAAAA=",
        base64_value_segment: "",
        real_value: "кась",
      };

      await doctor.updateSessionSpeech(session.session.session, data);
    };

    reader.readAsDataURL(audioData.blob);
  };

  return (
    <div>
      <AudioReactRecorder
        state={recordState}
        onStop={onStop}
        canvasHeight={150}
        backgroundColor="white"
      />

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
