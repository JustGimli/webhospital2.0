const domain_patient = 'http://127.0.0.1:50080'

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