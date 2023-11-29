import { BarChart } from "@mui/x-charts";
import { useState } from "react";
import { doctor } from "..";
import { Dialog, DialogContent } from "@mui/material";

export const SlogChart = ({
  session_id,
  card_number,
  handleCloseChart,
  open,
}: any) => {
  const sessionsData: any = useState<any>(async () => {
    const res = await doctor.getPatientSessionInfo(card_number, session_id);
    return res;
  });
  //   console.log(sessionsData);
  let not_reference_speech: any[] = [];
  let reference_speech: any[] = [];
  //   if (sessionsData.speech_array.length) {
  //     reference_speech = sessionsData.speech_array.map((s: any) => {
  //       if (s.is_reference_speech) {
  //         return s.speech_score;
  //       } else {
  //         not_reference_speech.push(s.speech_score);
  //       }
  //     });
  //     console.log(reference_speech);
  //     console.log(not_reference_speech);
  //   }
  const groups = not_reference_speech.map(({ e }: any) => {
    return { data: [e, ...reference_speech] };
  });
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        <span>test</span>
        {/* <BarChart
          xAxis={[{ scaleType: "band" }]}
          series={groups}
          width={500}
          height={300}
        /> */}
      </DialogContent>
    </Dialog>
  );
};
