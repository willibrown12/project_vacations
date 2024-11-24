import axios from "axios";






export type chartApi = {

  id: number;
  country: string;
  city: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number,
  followers_count: number
  image_url: string


}


export type chartUi = {
 

  location: string;
  followers_count: number
 


}




export async function SendToApiCharts(token: string) {


  const url = `http://localhost:3000/vacations`;

  const headers = token ? { Authorization: token } : {};

  const result = await axios.get<{ vacations: chartApi[] }>(url, { headers })



  const data = result?.data?.vacations.map((c: chartApi) => {
    return {
    
      location: c.country+"\n"+ c.city,
      followers_count: c.followers_count,
   



    }
  })




  return data;
}

