<<<<<<< HEAD
import axios from "axios"
import {makeAutoObservable} from "mobx"
import { $api_client } from "../utils/api_patient";




export default class Client {
    dockor: number = 0;
    
=======
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Client {
  email: string = "";
  doctor: any = {};
  constructor() {
    makeAutoObservable(this);
  }
>>>>>>> 83958db0f4d0cf292882af5fb791ea39c77fa621

  async createPatient(form: FormData) {
    try {
      // $api_doctor.post("/patient", form)
    } catch (err) {}
  }

  async login(username: string, password: string) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_CLIENT}login/`,
        { username, password }
      );
      localStorage.setItem("mptok", response.data.access_token);
      let date = new Date();
      document.cookie = `mptok=${
        response.data.access_token
      }; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24)}`;

      if (response.status === 201) {
        // this.errorMessage = "Ваш аккаунт успешно зарегистрирован, проверьте почту для подверждения регистрации"
        return true;
      }
    } catch (err) {
      return false;
    }
  }

<<<<<<< HEAD
    async createPatient(form: FormData) {
        try {
            $api_client.post("/patient", form)
        }catch(err) {
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_CLIENT}login/`, {username, password})
            localStorage.setItem('ctok', response.data.access_token)
            let date = new Date()
            document.cookie = `ctok=${response.data.access_token}; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24 )}`
            return true
           
        }catch(err) {return false}}
    
     async getDoctors()  {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL_CLIENT}doctors/`)
            return response.data
        }catch(err) {
            return []
        }
    }

    async checkPass(card: any) {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL_CLIENT}login/`, {params: {card_number:  card}})
            return response.data
        }catch(err) {
            return false
        }
    }
        
=======
  async getDoctors() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_CLIENT}doctors/`
      );
      return response.data;
    } catch (err) {
      return [];
    }
  }
>>>>>>> 83958db0f4d0cf292882af5fb791ea39c77fa621
}
