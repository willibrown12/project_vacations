import express, { Request, Response } from "express"

import {  z } from "zod"
import { ifUserExist } from "./handlers/ifUserExist"
import { createUser } from "./handlers/createUser"







const router = express.Router()





router.post("/", async (req: Request, res: Response, next) => {
    try {
      
       newUserSchema.parse(req.body)
        const newUser: userType = extractUser(req.body);
        if (await ifUserExist(newUser.email)) {
            return res.status(409).json({ message: "email already exist" })
        }
      const result = await createUser(newUser);
     return res.status(200).json({ message: "user registered successfully!", data: result})
      
    } catch (error: any) {
        console.log(error?.errors, res.getHeader("x-request-id"))
        return res.status(400).json({ error: "something went wrong" })
    }

})




export type userType ={

    id?: number;  
    first_name: string;     
    last_name: string;                 
    email: string;                       
    password: string;        
    role?: string;  
   
  }
  
  
  function extractUser(body: any): userType {
    const { id, first_name, last_name, email, password,role } = body;
    return { id, first_name, last_name, email, password,role};
  }
  
  


  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    const idSchema = z.number().optional()
   const firstNameSchema = z.string()
   const lastNameSchema = z.string()
   const emailSchema = z.string().email().min(15)
   const passwordSchema = z.string().regex(passwordRegex)
   const roleSchema = z.string().optional()

  const newUserSchema = z.object({
      
    id: idSchema,  
    first_name: firstNameSchema, 
    last_name: lastNameSchema,                 
    email: emailSchema,                       
    password: passwordSchema,       
    role: roleSchema,  
  })




export { router }

