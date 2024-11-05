import { VacationType } from "..";
import { getConnection } from "../../database";





export async function updateVacation(vacationId: number, vacation: VacationType) {
    
    if (isNaN(vacationId)) throw new Error("Input validation error")
    const query = `UPDATE vacations.locations SET country = ?, city = ?, description = ?, start_date = ?, end_date = ?, price =?, image_url =? WHERE (id = ?);`
    const connection = await getConnection();
    const result = await connection?.execute(query,
        [vacation.country, vacation.city, vacation.description, vacation.start_date, vacation.end_date, vacation.price, vacation.image_url,vacationId])
    // @ts-ignore
    return result[0]
}



