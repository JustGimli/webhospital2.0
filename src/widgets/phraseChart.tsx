import { BarChart } from "@mui/x-charts";

import { Dialog, DialogContent } from "@mui/material";

export const PhraseChart = ({
  handleCloseChart,
  open,
  sessionsData,
  compareSessions,
}: any) => {
  console.log(sessionsData);
  console.log(compareSessions);
  let reference_speech: number[] = [];
  let not_reference_speech: number[] = [];
  if (sessionsData.speech_array.length) {
    sessionsData.speech_array.forEach((s: any) => {
      if (
        s.speech_compares_history[
          s.speech_compares_history.length - 1
        ].hasOwnProperty("speech_score")
      ) {
        if (s.is_reference_signal) {
          reference_speech.push(
            Number(
              s.speech_compares_history[s.speech_compares_history.length - 1]
                .speech_score
            )
          );
        } else {
          not_reference_speech.push(
            Number(
              s.speech_compares_history[s.speech_compares_history.length - 1]
                .speech_score
            )
          );
        }
      }
    });
    if (!reference_speech.length) {
      compareSessions.forEach((sess: any) => {
        if (sess.speech_array.length) {
          sess.speech_array.forEach((s: any) => {
            if (
              s.speech_compares_history[
                s.speech_compares_history.length - 1
              ].hasOwnProperty("speech_score")
            ) {
              reference_speech.push(
                Number(
                  s.speech_compares_history[
                    s.speech_compares_history.length - 1
                  ].speech_score
                )
              );
            }
          });
        }
      });
    } else {
      compareSessions.forEach((sess: any) => {
        if (sess.speech_array.length) {
          sess.speech_array.forEach((s: any) => {
            if (
              s.speech_compares_history[
                s.speech_compares_history.length - 1
              ].hasOwnProperty("speech_score")
            ) {
              not_reference_speech.push(
                Number(
                  s.speech_compares_history[
                    s.speech_compares_history.length - 1
                  ].speech_score
                )
              );
            }
          });
        }
      });
    }
    if (reference_speech.length && not_reference_speech.length) {
      while (reference_speech.length < not_reference_speech.length) {
        reference_speech.push(100);
      }
      while (reference_speech.length > not_reference_speech.length) {
        reference_speech.push(0);
      }
    }
  }
  return (
    <Dialog open={open} onClose={handleCloseChart} fullWidth>
      <DialogContent>
        {!not_reference_speech.length && !reference_speech.length ? (
          <span>Сеансы не оценёны, невозможно построить график!</span>
        ) : !not_reference_speech.length ? (
          <span>
            Отсутсвуют оценённые неэталонные сеансы, невозможно построить
            график!
          </span>
        ) : !reference_speech.length ? (
          <span>
            Отсутсвуют оценённые эталонные сеансы, невозможно построить график!
          </span>
        ) : (
          <BarChart
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
