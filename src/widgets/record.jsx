import { useState, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
// import "react-audio-voice-recorder/dist/index.css";
import { IconButton, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { doctor } from "..";

export const RecorderVoiceItem = ({ speechId, handleButtonNext }) => {
  const { patientID } = useParams();
  const [phrases, setPhrases] = useState([]);
  const [index, setIndex] = useState(1);
  const [isMic, setisMic] = useState(false);
  const [audioData, setAudioData] = useState(null);

  console.log(window.crossOriginIsolated);

  useEffect(() => {
    const fetchData = async () => {
      const res = await doctor.getExampleSpeech(patientID, speechId);
      const speechType =
        speechId.session_type === "фраз"
          ? speechId.session_type + "а"
          : speechId.session_type;

      setPhrases(speechType === "слог" ? res.syllables : res.phrases);
    };

    fetchData();
  }, [patientID, speechId]);

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
        <RecordVoice
          speechId={speechId}
          handleIndex={handleIndex}
          real_val={phrases[index - 1]}
          setAudioData={setAudioData}
        />
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
            <input
              type="file"
              onChange={(event) => setAudioData(event.target.files[0])}
              accept=".wav"
              style={{ display: "none" }}
            />
          </Button>
        </div>
      )}
    </>
  );
};

const RecordVoice = ({ speechId, handleIndex, real_val, setAudioData }) => {
  const onStop = async (audioData) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(audioData);
    reader.onloadend = function () {
      const base64 = reader.result.split(",")[1];

      console.log(base64);
      const wavBase64 = convertToWavBase64(base64);

      const data = {
        speech_type:
          speechId.session_type === "фраз"
            ? speechId.session_type + "а"
            : speechId.session_type,
        base64_value: wavBase64,
        base64_value_segment: "",
        real_value: real_val,
      };

      doctor
        .updateSessionSpeech(speechId, data)
        .then(() => handleIndex())
        .catch((error) =>
          console.error("Error updating session speech:", error)
        );
    };
  };
  return (
    <div>
      <div className="flex justify-center">
        <AudioRecorder
          onRecordingComplete={onStop}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          //   downloadOnSavePress={true}
          downloadFileExtension="mp3"
          showVisualizer
        />
      </div>
    </div>
  );
};

const convertToWavBase64 = (base64) => {
  const binaryData = atob(base64);

  // Convert binary data to WAV format
  const audioBuffer = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    audioBuffer[i] = binaryData.charCodeAt(i);
  }

  const wavBuffer = new Uint8Array(44 + audioBuffer.length);
  wavBuffer.set(new TextEncoder().encode("RIFF"), 0);
  wavBuffer.set(new Uint32Array([audioBuffer.length + 36]), 4);
  wavBuffer.set(new TextEncoder().encode("WAVE"), 8);
  wavBuffer.set(new TextEncoder().encode("fmt "), 12);
  wavBuffer.set(new Uint32Array([16, 1, 1, 16000, 32000, 2, 16]), 16);
  wavBuffer.set(new TextEncoder().encode("data"), 36);
  wavBuffer.set(new Uint32Array([audioBuffer.length]), 40);
  wavBuffer.set(audioBuffer, 44);

  // Convert WAV data to base64
  const resultingData = btoa(String.fromCharCode.apply(null, wavBuffer));

  console.log(resultingData);
  return resultingData;
};
