

import axiosInstance from "../../handlers/axiosUrlService";


export type homeCardApi = typeof homeTemplate

export type homeCardUI = {

    country: string,
    city: string,
    image_url: string,
   
}




export async function SendToApiHome() {
   
    
    const result = await axiosInstance.get<{ cards:homeCardApi[]}>("/home")
 
    
    const data= result?.data?.cards.map((c:homeCardUI) => {
      return {
    
        country: c.country,
        city: c.city,
        image_url: c.image_url,
      }})
     ;
     
      
      return data;
     }


    const homeTemplate = {
        "country": "France",
        "city": "Paris",
        "image_url": "https://images.unsplash.com/photo-1511732356827-0e3a7ba21f51"
    }