import { IconButton, Button } from "@mui/material";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import MicIcon from "@mui/icons-material/Mic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";

export const RecorderVoiceItem = () => {
  const [isMic, setisMic] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
  };

  return isMic ? (
    <>
      <RecordVoice />
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

const RecordVoice = () => {
  const [recordState, setRecordState] = useState(RecordState.STOP);

  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
  };

  const onStop = (audioData) => {
    console.log("audioData", audioData);
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
        {recordState === RecordState.STOP ? (
          <IconButton onClick={start}>
            <FiberManualRecordIcon color="inherit" style={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={stop}>
            <CloseIcon />
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
