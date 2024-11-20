import { getConnection } from "../../database/connection";
import { getFullVacationQuery } from "./query/getFullVacationQuery";




export async function getVacations() {
    const connection = await getConnection();
    const Vacations = await connection?.execute(getFullVacationQuery())
    const result = Vacations?.[0]
    return result
}