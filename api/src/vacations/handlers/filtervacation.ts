import { getConnection } from "../../database";
import { getFullVacationQuery } from "./query/getFullVacationQuery";




export async function filterVacation(filter:string,iduser:number) {
    if(filter==="favorites"){   const connection = await getConnection();
        const Vacations = await connection?.execute(`SELECT 
        locations.*
    FROM 
        vacations.locations
     JOIN 
        vacations.followers 
    ON 
        vacations.locations.id = vacations.followers.idlocation
    where
      iduser=?`,[iduser])
        const result = Vacations?.[0]
        return result}

        if(filter==="active"){   const connection = await getConnection();
            const Vacations = await connection?.execute(`SELECT * FROM vacations.locations WHERE date(NOW()) between start_date and end_date`)
            const result = Vacations?.[0]
            return result}

            if(filter==="notactive"){   const connection = await getConnection();
                const Vacations = await connection?.execute(`SELECT * FROM vacations.locations WHERE DATE(NOW()) < DATE(start_date);`)
                const result = Vacations?.[0]
                return result}
 
}