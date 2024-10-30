import { getConnection } from "../../database";


export async function deleteVacation(vacationId: number) {
    if (typeof vacationId !== 'number') throw new Error("vacation id must be Number")
    const query = `DELETE FROM vacations.locations WHERE (id = ?);`
    const connection = await getConnection();
    const result = await connection?.execute(query, [vacationId])
    // @ts-ignore
    return result[0].affectedRows
}

