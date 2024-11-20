import axios from "axios"



export type loginType ={        
    email: string;                       
    password: string;        
  }



const BASE_URL = `http://localhost:3000`

export async function loginApi(user: loginType): Promise<{ message: string, token: string }> {
   
    
    const result = await axios.post(`${BASE_URL}/login`,
        user,
        { headers: { "content-type": "application/json" } })
        console.log(result);
    return result.data
}