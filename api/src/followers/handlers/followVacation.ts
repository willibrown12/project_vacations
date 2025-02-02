import pool from "../../database/connection";

export async function followVacation(vacationid: number, userid: number) {
  const query = `INSERT INTO vacations.followers (iduser, idlocation) VALUES (?, ?);`;

  const result = await pool.query(query, [userid, vacationid]);

  // @ts-ignore
  return result[0].insertId;
}
