import { BarChart } from "@mui/x-charts";
import { Dialog, DialogContent } from "@mui/material";

export const SlogChart = ({ handleCloseChart, open, sessionsData }: any) => {
  let not_reference_speech: any[] = [];
  let reference_speech: any[] = [];
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
  const groups = not_reference_speech.map(({ e }: any) => {
    return { data: [e, ...reference_speech] };
  });
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!groups.length ? (
          <span>Сеанс не оценён, невозможно построить график!</span>
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
