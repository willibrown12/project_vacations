
import axiosInstance from "../../handlers/axiosUrlService";



export type loginType ={        
    email: string;                       
    password: string;        
  }




export async function loginApi(user: loginType): Promise<{ message: string, token: string , idUser:number}> {
   
    
    const result = await axiosInstance.post(`/login`,
        user,
        { headers: { "content-type": "application/json" } })
        console.log(result);
    return result.data
}