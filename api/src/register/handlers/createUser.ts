import { userType, } from "..";
import  pool  from "../../database/connection";
import bcrypt from 'bcryptjs';




export async function createUser(user: userType) {


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    const query = `INSERT INTO vacations.users (first_name, last_name, email, password) VALUES (?, ?,?,?);`
   
    const result = await pool.query(query,
        [user.first_name, user.last_name, user.email, hashedPassword])


    // @ts-ignore
    return result[0].insertId
}




