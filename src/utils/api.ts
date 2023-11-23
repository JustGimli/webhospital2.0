
import axios from "axios"


const domain_doctor = 'http://127.0.0.1:48080'
const domain_patient = 'http://127.0.0.1:50080'

type AuthTokens = {
    access_token: string;
    refresh_token: string;
}
type GetAuthResponse = {
  data: AuthTokens[];
};
export async function login_doctor(login:string, passwd:string){
    const response = fetch(`${domain_doctor}/login`,
        {method:'POST',
            body:JSON.stringify({
                username: login,
                password: passwd
            })
    }).then((r)=>{
        if(r.ok){
            console.log(r.json())
        }
    });
}
export async function login_patient(login:string, passwd:string){
    const response = fetch(`${domain_patient}/login`,
        {method:'POST',
            body:JSON.stringify({
                username: login,
                password: passwd
            })
    }).then((r)=>{
        if(r.ok){
            console.log(r.json())
        }
    });
}


export const $api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('mptok')}`
    return config
})



$api.interceptors.response.use(config => {
    return config
}, (async(error) => {
    const originalRequest = error.config

    if (originalRequest && !originalRequest._isRetry && error.response.status === 401)
    {
        originalRequest._isRetry = true
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/jwt/refresh/`, {refresh: getCookie('mptok')})
            localStorage.setItem('mptok', response.data.access)
            return $api.request(originalRequest)
        }catch(error: any) {
            if (error.response.status === 401) {}
                // window.location.href = '/login'
        }
    } else {
        // localStorage.clear()
        // window.location.href = '/';
    }
    
    throw error
    
}))


export default function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
