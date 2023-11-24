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
            const response = await $api_doctor.get(`${process.env.REACT_APP_BASE_URL_DOCTOR}patients`, {params: {limit: 100}})

            return response.data
        }catch(err) {
            return []
        }
    }

    async getPatient(number: number) {
        try {
            const response = await $api_doctor.get(`${process.env.REACT_APP_BASE_URL_DOCTOR}patients/${number}`)

            return response.data
        }catch(err) {
            return {}
        }
    }
        
}


   

    // getMe() {
    //     (async () => {
    //         try {
    //             const resp = await $api.get('account/')
    //             const data =resp.data
    //             this.count_desc = data.count_desc
    //             this.is_promocode_used = data.is_promocode_used
    //             this.email = data.email
    //         }catch (err) {}
    //     })()
    // }




           
    //     }catch(error: any){
    //         if (error.response?.data?.email) {
    //             if ("user with this Email already exists." === error.response?.data?.email[0]) {
    //                 await this._getJWT(email, password)
    //             }else {
    //                 // this.setEmailError(error.response?.data?.email[0])
    //             }
    //         }

    //         if (error.response?.data?.password) {
    //             // this.setPassError(error.response?.data?.password[0])
    //         }

    //         if (error.response?.data?.status === 400) {
    //                 await this._getJWT(email, password)
    //         }
    //     }

    // }

    // async _getJWT(email: string, password: string) {
    //     try{

    //         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/jwt/create/`,  {email, password}, {withCredentials: true})
    //         localStorage.setItem('mptok', response.data.access)
    //         let date = new Date()
    //         document.cookie = `mptok=${response.data.refresh}; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24 )}`

    //         this.setAuth(true)
    //     }catch(error: any){ 
    //         this.errorMessage = error.response.data?.detail 
    //     }   
    // }
    
    // exit() {
    //     this.isAuth = false
        
    // }

    // async checkAuth() {
        
    //     try {
    //         await axios.post(`${process.env.REACT_APP_BASE_URL}auth/jwt/verify/`, {"token": localStorage.getItem('mptok')})
    //         this.isAuth = true
    //     }catch (error) {
    //         if (getCookie("mptok")) {
    //             console.log(error)
    //             try {
    //                 await axios.post(`${process.env.REACT_APP_BASE_URL}auth/jwt/verify/`, {"token": getCookie("mptok")})
    //                 this.isAuth = true
    //             }catch (error) {
    //                 console.log(error)
    //             }
    //         }
    //     }
    // }
    
