import pool from "../../database/connection";

export async function getUserData(id: number) {
  const query = `SELECT CONCAT(first_name, ' ', last_name) AS full_name, role
FROM vacations.users
WHERE id = ?`;

  const Vacations = await pool.query(query, [id]);
  const result = Vacations?.[0];

  return result;
}
