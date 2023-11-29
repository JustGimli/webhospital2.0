import { BarChart } from "@mui/x-charts";
import { Dialog, DialogContent } from "@mui/material";

export const PhraseChart = ({ handleCloseChart, open, sessionsData }: any) => {
  let reference_speech: any[] = [];
  let not_reference_speech: any[] = [];
  if (sessionsData.speech_array.length) {
    reference_speech = sessionsData.speech_array.map((s: any) => {
      if (s.hasOwnProperty("speech_score")) {
        if (s.is_reference_signal) {
          return s.speech_score;
        } else {
          not_reference_speech.push(s.speech_score);
        }
      }
    });
  }
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!not_reference_speech.length ? (
          <span>Сеанс не оценён, невозможно построить график!</span>
        ) : (
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: reference_speech,
                label: "Эталон",
              },
              {
                data: not_reference_speech,
                label: "Не эталон",
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
