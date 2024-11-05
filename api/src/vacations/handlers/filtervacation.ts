import { getConnection } from "../../database";
import { getFullVacationQuery } from "./query/getFullVacationQuery";




export async function filterVacation(filter:string,iduser:number) {
    const connection = await getConnection();
    const Vacations = await connection?.execute(`SELECT 
    locations.*
FROM 
    vacations.locations
 JOIN 
    vacations.followers 
ON 
    vacations.locations.id = vacations.followers.idlocation
where
  iduser=2`)
    const result = Vacations?.[0]
    return result
}