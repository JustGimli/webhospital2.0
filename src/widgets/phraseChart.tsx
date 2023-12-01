import { BarChart, LineChart } from "@mui/x-charts";

import { Dialog, DialogContent } from "@mui/material";

export const PhraseChart = ({ handleCloseChart, open, sessionsData }: any) => {
  let evals: any[] = [];
  let x_nums: any[] = [];
  sessionsData.forEach((element: any) => {
    if (
      element.session_compares_history.length &&
      element.session_compares_history[0].compared_sessions_id &&
      element.session_compares_history[0].compared_sessions_id.length === 1
    ) {
      x_nums.push(element.session_id);
      evals.push(
        element.session_compares_history[
          element.session_compares_history.length - 1
        ].session_score
      );
    }
  });
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!evals.length ? (
          <span>Сеансы не оценёны, невозможно построить график!</span>
        ) : (
          <LineChart
            xAxis={[{ data: x_nums }]}
            series={[
              {
                data: evals,
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
