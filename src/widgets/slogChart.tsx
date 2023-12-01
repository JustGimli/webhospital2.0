import { LineChart } from "@mui/x-charts";
import { Dialog, DialogContent } from "@mui/material";

export const SlogChart = ({ handleCloseChart, open, sessionsData }: any) => {
  console.log(sessionsData);
  let evals: any[] = [];
  let x_nums: any[] = [];
  sessionsData.forEach((element: any) => {
    if (
      element.session_compares_history.length &&
      element.session_compares_history[0].compared_sessions_id &&
      element.session_compares_history[0].compared_sessions_id.length === 2
    ) {
      x_nums.push(
        element.session_compares_history[
          element.session_compares_history.length - 1
        ].compared_sessions_id[0] +
          "/" +
          element.session_compares_history[
            element.session_compares_history.length - 1
          ].compared_sessions_id[1]
      );
      evals.push({
        data: element.session_compares_history[
          element.session_compares_history.length - 1
        ].session_score,
        label: x_nums[x_nums.length - 1],
      });
    }
  });
  console.log(evals);
  console.log(x_nums);
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!evals.length ? (
          <span>Сеансы не оценёны, невозможно построить график!</span>
        ) : (
          <LineChart
            xAxis={[{ scaleType: "point", data: x_nums }]}
            series={evals}
            width={500}
            height={300}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
