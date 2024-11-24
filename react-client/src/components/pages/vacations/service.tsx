import axios from "axios";






export type vacationCardApi = {
  
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



export async function SendToApiVacations(token: string) {


  const url = `http://localhost:3000/vacations`;

  const headers = token ? { Authorization: token } : {};

  const result = await axios.get<{ vacations: vacationCardApi[] }>(url, { headers })



  const data = result?.data?.vacations.map((c: vacationCardApi) => {
    return {
      id: c.id,
      country: c.country,
      city: c.city,
      description: c.description,
      start_date: c.start_date,
      end_date: c.end_date,
      price: c.price,
      followers_count: c.followers_count,
      image_url: c.image_url



    }
  })
  
  




  return data;
}




export async function SendToApiFollowers(token: string) {

  const url = `http://localhost:3000/followers`;

  const headers = token ? { Authorization: token } : {};

  const result = await axios.get<{ Followers: FollowType[] }>(url, { headers })




  const data = result?.data?.Followers.map((c: FollowType) => {
    return {
      idlocation: c.idlocation,

    }
  })




  return data;
}





export async function followApi(isFollowed: boolean, id: number): Promise<{ message: string }> {

  const URL = `http://localhost:3000/followers`
  if (isFollowed) {
    const result = await axios.post(`${URL}/${id}`,
      { headers: { "content-type": "application/json" } })
    return result.data
  } else {
    const result = await axios.delete(`${URL}/${id}`,
      { headers: { "content-type": "application/json" } })

      return result.data;
}
}


export type FollowType = {
  idlocation: number
}


export async function SendToApiDelete(token: string,id:number) {
  if (Number.isNaN(id)) {
    throw new Error ("error cant delete data")
  }

  const url = `http://localhost:3000/vacations/${id}`;

  const headers = {Authorization: token } 

  const result = await axios.delete(url, { headers })





  return result;
}

