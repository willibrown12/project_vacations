import pool from "../../database/connection";

export async function deleteFollowVacation(vacationid: number, userid: number) {
  const query = `SELECT * 
      FROM vacations.followers 
     WHERE idlocation = ? AND idUser = ?`;

  const result = await pool.query(query, [vacationid, userid]);

  const idToDelete: any = result?.[0];

  if (typeof idToDelete[0].id === "number") {
    const recordId = idToDelete[0].id;
    const querytodelete = `DELETE FROM vacations.followers WHERE (id = ?);`;
    const deleteRows = await pool.query(querytodelete, [recordId]);

    // @ts-ignore

    return deleteRows[0].affectedRows;
  }

  // @ts-ignore
  return Error;
}
