import { query } from "express";
import { getConnection } from "../../database/connection";



export async function getFollowers(id: number) {
    const connection = await getConnection();
    const query = `SELECT idlocation FROM vacations.followers where iduser = ?`
    const Vacations = await connection?.execute(query, [id])
    const result = Vacations?.[0]
    return result
}