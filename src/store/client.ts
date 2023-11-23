import axios from "axios"
import {makeAutoObservable} from "mobx"




class User {
    email: string = ""
    


    constructor() {
        makeAutoObservable(this)
    }

    async createPatient(form: FormData) {
        try {
            // $api_doctor.post("/patient", form)
        }catch(err) {
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_DOCTOR}login/`, {username, password})
            localStorage.setItem('mptok', response.data.access_token)
            let date = new Date()
            document.cookie = `mptok=${response.data.access_token}; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24 )}`

            if (response.status === 201) {
                // this.errorMessage = "Ваш аккаунт успешно зарегистрирован, проверьте почту для подверждения регистрации"
                return true
            }
        }catch(err) {return false}}
    
     async getPatients()  {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL_DOCTOR}patients/`)
            return response.data
        }catch(err) {
            return []
        }
    }
        
}

