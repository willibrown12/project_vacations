import axios from "axios"

export type vacationCardEdit = {
    
    id: number;
    country: string;
    city: string;
    description: string;
    start_date?: Date;
    end_date?: Date;
    price: number,
    image_url: string
 
  }
  
const BASE_URL = `http://localhost:3000`

export async function UpdateVactionApi(vacation: vacationCardEdit,token:string): Promise<{ message: string }> {
    const headers = {Authorization: token } 
    const result = await axios.put(`${BASE_URL}/vacations/${vacation.id}`,
        vacation,
        { headers})
    return result.data
}