import { VacationType } from "..";
import pool from "../../database/connection";

export async function updateVacation(
  vacationId: number,
  vacation: VacationType
) {
  if (isNaN(vacationId)) throw new Error("Input validation error");
  const query = `UPDATE vacations.locations SET country = ?, city = ?, description = ?, start_date = ?, end_date = ?, price =?, image_url =? WHERE (id = ?);`;

  const result = await pool.query(query, [
    vacation.country,
    vacation.city,
    vacation.description,
    new Date(vacation.start_date).toISOString().slice(0, 19).replace("T", " "),
    new Date(vacation.end_date).toISOString().slice(0, 19).replace("T", " "),
    vacation.price,
    vacation.image_url,
    vacationId,
  ]);
  // @ts-ignore
  return result[0];
}
