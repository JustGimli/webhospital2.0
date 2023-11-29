import { BarChart } from "@mui/x-charts";

export const PhraseChart = ({ sessionsData }: any) => {
  //   console.log(sessionsData);
  //   let not_reference_speech: any[] = [];
  //   const reference_speech = sessionsData.speech_array.map((s: any) => {
  //     if (s.is_reference_speech) {
  //       return s.speech_score;
  //     } else {
  //       not_reference_speech.push(s.speech_score);
  //     }
  //   });

  return (
    <BarChart
      //   xAxis={[
      //     {
      //       scaleType: "band",
      //     },
      //   ]}
      series={[
        { data: [3, 4, 1, 6, 5], stack: "A", label: "Эталон" },
        { data: [4, 3, 1, 5, 8], stack: "A", label: "Не эталон" },
      ]}
      width={500}
      height={300}
    />
  );
};
