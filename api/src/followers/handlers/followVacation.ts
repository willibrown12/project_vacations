
import { getConnection } from "../../database/connection";




export async function followVacation(vacationid: number, userid: number) {


    const query = `INSERT INTO vacations.followers (iduser, idlocation) VALUES (?, ?);`
    const connection = await getConnection();
    const result = await connection?.execute(query,
        [userid, vacationid])


    // @ts-ignore
    return result[0].insertId
}


