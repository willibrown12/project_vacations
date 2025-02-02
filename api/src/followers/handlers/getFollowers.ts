import { query } from "express";
import pool from "../../database/connection";

export async function getFollowers(id: number) {
  const query = `SELECT idlocation FROM vacations.followers where iduser = ?`;
  const Vacations = await pool.query(query, [id]);
  const result = Vacations?.[0];
  return result;
}
