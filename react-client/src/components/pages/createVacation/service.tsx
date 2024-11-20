import axios from "axios"

export type CreateVacationCard = {
    
  
    country: string;
    city: string;
    description: string;
    start_date?: Date;
    end_date?: Date;
    price: number,
    image_url: string
 
  }
  
const BASE_URL = `http://localhost:3000`

export async function createVacationApi(vacation: CreateVacationCard,token:string): Promise<{ message: string }> {
    const headers = {Authorization: token } 
    const result = await axios.post(`${BASE_URL}/vacations`,
        vacation,
        { headers})
    return result.data
}