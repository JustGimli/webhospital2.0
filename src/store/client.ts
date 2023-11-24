import axios from "axios"
import {makeAutoObservable} from "mobx"
import { $api_client } from "../utils/api_patient";




export default class Client {
    dockor: any = {};
    card: any= ""
    lastPass: any= ""
    


    constructor() {
        makeAutoObservable(this)
    }

    async createPatient(form: FormData) {
        try {
            $api_client.post("/patient", form)
        }catch(err) {
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_CLIENT}login/`, {card_number: username,constant_password: password})
            localStorage.setItem('ctok', response.data.access_token)
            let date = new Date()
            document.cookie = `ctok=${response.data.access_token}; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24 )}`

          
            return true

        }catch(err) {return false}
    }
    
    async checkStatusPass() {
        try {
         const response = await axios.get(`${process.env.REACT_APP_BASE_URL_CLIENT}login`, {params: {card_number: this.card}})

         return response.data.is_password_changed
        } catch (err) {
            return false
        }
    }

    async changeTempPass( newPass: any) {
         try {
         const response = await axios.patch(`${process.env.REACT_APP_BASE_URL_CLIENT}login/`, {card_number: this.card, constant_password: newPass, temporary_password: this.lastPass})

        localStorage.setItem('ctok', response.data.access_token)
        let date = new Date()
        document.cookie = `ctok=${response.data.access_token}; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24 )}`

          
         return true
        } catch (err) {
            return false
        }
    }

    

    async getDoctors()  {
        try {
            const response = await $api_client.get(`${process.env.REACT_APP_BASE_URL_CLIENT}info/`)
            return response.data.doctor_info
        }catch(err) {
            return []
        }
    }
        
}
