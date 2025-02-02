
import axiosInstance from "../../handlers/axiosUrlService";

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
  


export async function UpdateVactionApi(vacation: vacationCardEdit,token:string): Promise<{ message: string }> {
    const headers = {Authorization: token } 
    const result = await axiosInstance.put(`/vacations/${vacation.id}`,
        vacation,
        { headers})
    return result.data
}