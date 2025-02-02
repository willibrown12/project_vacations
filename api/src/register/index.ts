import express, { Request, Response } from "express";

import { ifUserExist } from "./handlers/ifUserExist";
import { createUser } from "./handlers/createUser";
import { newUserSchema } from "./handlers/zodScheme/newUserSchema";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next) => {
  try {
    newUserSchema.parse(req.body);
    const newUser: userType = extractUser(req.body);
    if (await ifUserExist(newUser.email)) {
      return res.status(409).json({ message: "email already exist" });
    }
    const result = await createUser(newUser);
    return res
      .status(200)
      .json({ message: "user registered successfully!", data: result });
  } catch (error: any) {
    console.log(error?.errors, res.getHeader("x-request-id"));
    next(error)
  }
});

export type userType = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: string;
};

function extractUser(body: any): userType {
  const { id, first_name, last_name, email, password, role } = body;
  return { id, first_name, last_name, email, password, role };
}

export { router };
