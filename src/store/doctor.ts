import axios from "axios"
import {makeAutoObservable} from "mobx"
import { $api_doctor } from "../utils/api_doctor"



export default class  Doctor {
    name: any = ""
    


    constructor() {
        makeAutoObservable(this)
    }

    async createPatient(form: any) {
        try {
            $api_doctor.post("/patients/", form, {headers: {"Content-Type": "application/json"}})
        }catch(err) {
        }
    }

    async login(username: string, password: string) {
        this.name = username
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_DOCTOR}login/`, {username, password}, {withCredentials: true})
            localStorage.setItem('tok', response.data.access_token)
    
            let date = new Date();
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000); 
            
            document.cookie = `tok=${
                response.data.refresh_token
            }; path=/;expires=${date.toUTCString()}`;

                // this.errorMessage = "Ваш аккаунт успешно зарегистрирован, проверьте почту для подверждения регистрации"
            return true
        }catch(err) {
            return false
        }}
    
     async getPatients()  {
        try {
            const response = await $api_doctor.get(`patients`, {params: {limit: 100}})

            return response.data
        }catch(err) {
            return []
        }
    }

    async getPatient(number: number) {
        try {
            const response = await $api_doctor.get(`patients/${number}`)

            return response.data
        }catch(err) {
            return {}
        }
    }
    async getPatientSessionInfo(number:number,session_id:number){
        try {
            const response = await $api_doctor.get(`patients/${number}/session/${session_id}`)

            return response.data
        }catch(err) {
            return {}
        }
    }

    async createScenario(card: any, is_reference_session: any, session_type: any) {
        try {
            const response = await $api_doctor.post(`patients/${card}`, {is_reference_session, session_type})
            return response.data
       
        }catch(err) {
            return {}
        }
    }



    async updateSessionSpeech (session: any,  data: any) {
        try {
            const response = await $api_doctor.post(`patients/${session.sessionPatient}/speech/${session.session_id}`, data)
        return response.data
        }catch(err) {
            return {}
        }
    }

    async getSpeech (session: any, speechId: any)  {
         try {
            // const response = await $api_doctor.get(`patients/${session}/session/${speechId}/speech`)
            const response = await $api_doctor.get(`patients/${session}/session/${speechId}/speech/${1}`)
            
        // return response.data
        }catch(err) {
            return {}
        }
    }


   
}

    
