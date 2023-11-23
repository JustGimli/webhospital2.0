
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