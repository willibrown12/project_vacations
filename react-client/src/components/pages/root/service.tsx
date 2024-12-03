import axios from "axios";



export type userTypeApi = {
  
    fullName: string
    role: string;
    
};
  
  
  

export async function SendToApiID(token: string, id:number) {
   
   
    

    const url = `http://localhost:3000/login/${id}`;
  
    
  
    const headers = token ? { Authorization: token } : {};
  
    const result = await axios.get<{ user: userTypeApi }>(url, { headers })
  
  
  
 
 
    const data = result?.data?.user
  
  

  
  
    return data;
  }