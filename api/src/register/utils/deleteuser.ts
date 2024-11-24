import { getConnection } from "../../database/connection";


export async function deleteUser(Id: number) {
    if (typeof Id !== 'number') throw new Error("vacation id must be Number")
    const query = `DELETE FROM vacations.users WHERE (id = ?);`
    const connection = await getConnection();
    const result = await connection?.execute(query, [Id])
    // @ts-ignore
    return result[0].affectedRows
}

