import { log } from "console";
import  pool  from "../../database/connection";


export async function ifUserExist(email: string) {

  
    const query = `SELECT * FROM vacations.users WHERE email =?`
    const user = await pool.query(query, [email])
    // @ts-ignore

    const result: any = user[0]
    if (result.length === 0) return false;
    return true
}