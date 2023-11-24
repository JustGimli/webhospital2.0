import { AudioRecorder } from "react-audio-voice-recorder";
import { doctor } from "..";

const RecorderVoice = (sessionType: any, speech: any, card: any) => {
  const addAudioElement = async (blob: Blob) => {
    const base64Value = await blobToBase64(blob);

    const data = {
      speech_type: sessionType,
      base64_value: base64Value,
      base64_value_segment: "",
      real_value: "кась",
    };
    await doctor.updateScenario(card, speech, data);
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
