import pool from "../../database/connection";

export async function deleteVacation(vacationId: number) {
  if (typeof vacationId !== "number")
    throw new Error("vacation id must be Number");
  const query = `DELETE FROM vacations.locations WHERE (id = ?);`;

  const result = await pool.query(query, [vacationId]);
  // @ts-ignore
  return result[0].affectedRows;
}
