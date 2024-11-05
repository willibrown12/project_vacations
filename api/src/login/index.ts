import express, { Request, Response } from "express"
import { loginUser,  } from "./handlers/loginUser"
import jwt from "jsonwebtoken";
import { z, } from "zod"






const router = express.Router()

router.post("/",  async (req: Request, res: Response, next) => {
    try {
        
        loginSchema.parse(req.body)
        const newUser: loginType = extractLogin(req.body);
        const result = await loginUser(req.body)
        if (result.authentication === false) {
            return res.status(401).json({ message: "email or passwords are incorrect" })
        } else {
            
            const token = jwt.sign({ role:result.role , fullName:result.full_name ,idUser:result.idUser}, process.env.SECRET as string, {
                expiresIn:'10h',
              });
            return res.status(200).json({ message: "user logged In successfully!", token })
        }
    } catch (error: any) {
        console.log(error?.errors, res.getHeader("x-request-id"))
        return res.status(400).json({ error: "something went wrong" })
    }
})




export type loginType ={        
    email: string;                       
    password: string;        
  }
  
  
  function extractLogin(body: any): loginType {
    const { email, password } = body;
    return { email, password};
  }
  
  
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  const emailSchema = z.string().email().min(15)
  const passwordSchema = z.string().regex(passwordRegex)


const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})



export { router }

