import express from "express"
import { getVacations } from "./handlers/getVacations";





const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      const data = await getVacations();
      res.json({ cards: data });
    } catch (error) {
      next(error)
    }
  });
  




export { router }

