import  pool  from "../../database/connection";
import { getFullVacationQuery } from "./query/getFullVacationQuery";




export async function getVacations() {
    
    const Vacations = await pool.query(getFullVacationQuery())
    const result = Vacations?.[0]
    return result
}