import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import getTokenFromHeaders from "./handlers/getTokenFromHeader";
import { log } from "console";




export default function authenticate(req : Request, res: Response, next: NextFunction) {
  try {
    const token = getTokenFromHeaders(req);
   
    
    if (!token) return res.status(401).json({ message: "Unauthorized!" });
    const decoded = jwt.verify(token, process.env.SECRET as string);
    if (decoded) {
     console.log(decoded);
     
      next();
    } else {
      res.status(401).json({ message: "Unauthorized!" });
    }
  } catch (error) {
    return res.status(401).json({  message: "Unauthorized!" })
  }
   
  }

