
import axios from "axios"

const domain_doctor = 'http://127.0.0.1:48080'


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



export const $api_doctor = axios.create({
    baseURL: domain_doctor,
    withCredentials: true,
})

$api_doctor.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('mptok')}`
    return config
})



$api_doctor.interceptors.response.use(config => {
    return config
}, (async(error) => {
    const originalRequest = error.config

    if (originalRequest && !originalRequest._isRetry && error.response.status === 401)
    {
        originalRequest._isRetry = true
        try {
            const response = await axios.post(`${domain_doctor}/update_tokens`, {refresh: getCookie('mptok')})
            localStorage.setItem('mptok', response.data.access)
            return $api_doctor.request(originalRequest)
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

export async function get_patients(limit:number){
   await $api_doctor.get(`${domain_doctor}/patients?limit=${limit}`).then((r) =>{
       if(r.status==200){
            return r.data
       }else{
           console.log('Невозможно получить пациентов')
       }
   })
}