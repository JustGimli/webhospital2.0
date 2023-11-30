import { BarChart } from "@mui/x-charts";
import { Dialog, DialogContent } from "@mui/material";

export const SlogChart = ({ handleCloseChart, open, sessionsData }: any) => {
  let not_reference_speech: any[] = [];
  let reference_speech: any[] = [];
  if (
    sessionsData.speech_array.length &&
    sessionsData.speech_array.hasOwnProperty("speech_compares_history")
  ) {
    reference_speech = sessionsData.speech_array.map((s: any) => {
      if (s.speech_compares_history[0].hasOwnProperty("speech_score")) {
        if (s.is_reference_signal) {
          return s.speech_compares_history[0].speech_score;
        } else {
          not_reference_speech.push(s.speech_compares_history[0].speech_score);
        }
      }
    });
  }
  const groups = not_reference_speech.map(({ e }: any) => {
    return { data: [e, ...reference_speech] };
  });
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!not_reference_speech.length && !reference_speech.length ? (
          <span>Сеансы не оценёны, невозможно построить график!</span>
        ) : !not_reference_speech.length ? (
          <span>
            Отсутсвуют оценённые неэталонные, невозможно построить график!
          </span>
        ) : !reference_speech.length ? (
          <span>
            Отсутсвуют оценённые эталонные, невозможно построить график!
          </span>
        ) : (
          <BarChart
            xAxis={[{ scaleType: "band" }]}
            series={groups}
            width={500}
            height={300}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
