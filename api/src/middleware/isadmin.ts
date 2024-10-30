

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import getTokenFromHeaders from "./handlers/getTokenFromHeader";




export function isAdmin(req : Request, res: Response, next: NextFunction) {
try {

 
  
  const token = getTokenFromHeaders(req);
  const decoded:any = jwt.verify(token, process.env.SECRET as string); // Use your secret key
  
  
  if (decoded.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
} catch (error) {
  return res.status(401).json({  message: "Unauthorized!" })
}
   
  }


