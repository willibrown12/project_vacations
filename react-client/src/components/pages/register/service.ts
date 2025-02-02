
import axiosInstance from "../../handlers/axiosUrlService";


export type userType = {

    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: string;
  
  }
  


export async function registerApi(user: userType): Promise<{ message: string }> {
    const result = await axiosInstance.post(`/register`,
        user,
        { headers: { "content-type": "application/json" } })
    return result.data
}