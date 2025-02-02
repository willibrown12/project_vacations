
import axiosInstance from "../../handlers/axiosUrlService";


export type CreateVacationCard = {
    
  
    country: string;
    city: string;
    description: string;
    start_date?: Date;
    end_date?: Date;
    price: number,
    image_url: string
 
  }
  


export async function createVacationApi(vacation: CreateVacationCard,token:string): Promise<{ message: string }> {
   
    const headers = {Authorization: token } 
    const result = await axiosInstance.post(`vacations`,
        vacation,
        { headers})
    return result.data
}