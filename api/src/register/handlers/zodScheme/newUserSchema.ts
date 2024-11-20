import {  z } from "zod"



const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
const idSchema = z.number().optional()
const firstNameSchema = z.string()
const lastNameSchema = z.string()
const emailSchema = z.string().email().min(15)
const passwordSchema = z.string().regex(passwordRegex)
const roleSchema = z.string().optional()

export const newUserSchema = z.object({
  
id: idSchema,  
first_name: firstNameSchema, 
last_name: lastNameSchema,                 
email: emailSchema,                       
password: passwordSchema,       
role: roleSchema,  
})

