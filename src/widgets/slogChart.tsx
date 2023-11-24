import {BarChart} from "@mui/x-charts";

export const SlogChart = ({sessionsData}: any) => {
    let not_reference_speech: any[] = [];
    const reference_speech = sessionsData.speech_array.map((s: any)=>{
       if(s.is_reference_speech){
           return s.speech_score
       }
       else {
           not_reference_speech.push(s.speech_score)
       }
    })
    const groups = not_reference_speech.map(({e}:any)=>{
        return {data:[e,...reference_speech]}
    })
    return(
      <BarChart
          xAxis={[{ scaleType: 'band'}]}
          series={groups}
          width={500}
          height={300}
        />
    );
}