import { loginType } from "..";
import pool from "../../database/connection";
import bcrypt from "bcryptjs";
import { userType } from "../../register";

type loginRoleType = {
  authentication: boolean;
  role?: string;
  full_name?: string;
  idUser?: number;
};

export async function loginUser(user: loginType): Promise<loginRoleType> {
  const query = `SELECT * FROM vacations.users WHERE email =?`;
  const foundUser = await pool.query(query, [user.email.toLowerCase()]);
  // @ts-ignore

  const result: Array<userType> = foundUser[0];
  if (result.length === 0) return { authentication: false };

  const storedHashedPassword = result[0].password;
  const isPasswordValid = await bcrypt.compare(
    user.password,
    storedHashedPassword
  );
  const fullName = result[0].first_name + " " + result[0].last_name;
  return {
    authentication: isPasswordValid,
    role: result[0].role,
    full_name: fullName,
    idUser: result[0].id,
  };
}

// const emailPasswordMap = {
//     "willi@gmail.com": "Vilibrown12!",
//     "michael.smith@example.com": "BlueSky22@",
//     "sarah.davis@example.com": "Coffee123!",
//     "daniel.lee@example.com": "Moonlight55$",
//     "olivia.brown@example.com": "StarryNight7#",
//     "emily.johnson@example.com": "Sunset2024%"
// };
