import {BarChart} from "@mui/x-charts";

export const PhraseChart = ({sessionsData}: any) => {
    let not_reference_speech: any[] = [];
    const reference_speech = sessionsData.speech_array.map((s: any)=>{
       if(s.is_reference_speech){
           return s
       }
       else {
           not_reference_speech.push(s)
       }
    })

    return(

        <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: reference_speech,
                  label: 'Эталон'
                },
                {
                  data: not_reference_speech,
                  label: 'Не эталон'
                },
              ]}
              width={500}
              height={300}
/>
    );
}