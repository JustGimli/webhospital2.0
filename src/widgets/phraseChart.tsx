import { BarChart } from "@mui/x-charts";
import { doctor } from "../index";
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";

export const PhraseChart = ({
  session_id,
  card_number,
  handleCloseChart,
  open,
}: any) => {
  const sessionsData: any = useState<any>(async () => {
    const res = await doctor.getPatientSessionInfo(card_number, session_id);
    return res[0];
  });
  let reference_speech: any[] = [];
  let not_reference_speech: any[] = [];
  console.log(sessionsData);
  // if (sessionsData.speech_array.length) {
  //   reference_speech = sessionsData.speech_array.map((s: any) => {
  //     if (s.is_reference_speech) {
  //       return s.speech_score;
  //     } else {
  //       not_reference_speech.push(s.speech_score);
  //     }
  //   });
  //   console.log(reference_speech);
  //   console.log(not_reference_speech);
  // }
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        <span>test</span>
        {/* {hasSpeech ? (
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
        ) : (
          <span>No chart!</span>
        )} */}
      </DialogContent>
    </Dialog>
  );
};
