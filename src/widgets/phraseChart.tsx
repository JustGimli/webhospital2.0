import {BarChart} from "@mui/x-charts";
import {doctor} from "../index";
import {useState} from "react";

export const PhraseChart = ({session_id, card_number}: any) => {
    const sessionData: any = useState<any>(async ()=>{
        const res = await doctor.getPatientSessionInfo(card_number,session_id)
        return res
    })
    let not_reference_speech: any[] = [];
    if(sessionData.speech_array){
        const reference_speech = sessionData.speech_array.map((s: any)=>{
       if(s.is_reference_speech){
           return s.speech_score
       }
       else {
           not_reference_speech.push(s.speech_score)
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
    }else{
        return(<span></span>)
    }

}