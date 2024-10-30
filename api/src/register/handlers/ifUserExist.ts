import { log } from "console";
import { getConnection } from "../../database";


export async function ifUserExist(email:string) {

    const connection = await getConnection();
   const query = `SELECT * FROM vacations.users WHERE email =?`
   const user = await connection?.execute(query,[email])
       // @ts-ignore

   const result:any=user[0]
    if (result.length=== 0) return false;
     return true
}