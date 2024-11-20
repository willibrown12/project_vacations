import { VacationType } from "..";
import { getConnection } from "../../database/connection";




export async function createVacation(vacation: VacationType) {



    const query = `INSERT INTO vacations.locations (country, city, description, start_date, end_date, price, image_url)  VALUES ( ?,?, ?,?,?,?,?);`
    const connection = await getConnection();
    const result = await connection?.execute(query,
        [vacation.country, vacation.city, vacation.description, new Date(vacation.start_date).toISOString().slice(0, 19).replace('T', ' '), new Date(vacation.end_date).toISOString().slice(0, 19).replace('T', ' '), vacation.price, vacation.image_url])


    // @ts-ignore
    return result[0].insertId
}


