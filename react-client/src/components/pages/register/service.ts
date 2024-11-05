import axios from "axios"


export type userType = {

    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: string;
  
  }
  
const BASE_URL = `http://localhost:3000`

export async function registerApi(user: userType): Promise<{ message: string }> {
    const result = await axios.post(`${BASE_URL}/register`,
        user,
        { headers: { "content-type": "application/json" } })
    return result.data
}