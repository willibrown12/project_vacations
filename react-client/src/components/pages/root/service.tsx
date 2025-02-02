
import axiosInstance from "../../handlers/axiosUrlService";



export type userTypeApi = {
  
    fullName: string
    role: string;
    
};
  
  
  

export async function SendToApiID(token: string, id:number) {
   
   
    

  
    
  
    const headers = token ? { Authorization: token } : {};
  
    const result = await axiosInstance.get<{ user: userTypeApi }>(`login/${id}`, { headers })
  
  
  
 
 
    const data = result?.data?.user
  
  

  
  
    return data;
  }