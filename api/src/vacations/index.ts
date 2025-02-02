import express from "express";

import { createVacation } from "./handlers/createVacation";
import { deleteVacation } from "./handlers/deleteVacation";
import { updateVacation } from "./handlers/updateVacation";
import { newVacationSchema } from "./handlers/zodScheme/zodScheme";
import { isAdmin } from "../middleware/isadmin";
import { getVacations } from "./handlers/getVacations";
import { ZodError } from "zod";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getVacations();
    res.json({ vacations: data });
  } catch (error) {
    next(error)
    console.log(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    newVacationSchema.parse(req.body);
    const newVacation: VacationType = extractVacation(req.body);
    const result = await createVacation(newVacation);
    return res.status(200).json({ message: "vacation added", data: result });
  } catch (error) {
    if (error instanceof ZodError) {
      // Send the raw Zod error messages in the response
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    next(error)
    console.log(error);
  }
});

router.delete("/:idToDelete", isAdmin, async (req, res, next) => {
  try {
    const affectedRows = await deleteVacation(+req.params.idToDelete);

    if (affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Vacation deleted successfully", affectedRows });
    } else {
      res.status(404).json({ message: "Vacation not found" });
    }
  } catch (error) {
    console.error("Error deleting vacation:", error);
    next(error)
  }
});

router.put("/:idToUpdate", isAdmin, async (req, res, next) => {
  try {
    newVacationSchema.parse(req.body);

    const vacationToUpdate = extractVacation(req.body);
    console.log(vacationToUpdate, req.params.idToUpdate);
    const affectedRows = await updateVacation(
      +req.params.idToUpdate,
      vacationToUpdate
    );
    res.json({ message: affectedRows });
  } catch (error) {
    if (error instanceof ZodError) {
      // Send the raw Zod error messages in the response
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    console.log((error as any).message);
    next(error)
  }
});

export type VacationType = {
  id?: number;
  country: string;
  city: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;

  image_url: string;
};

function extractVacation(body: any): VacationType {
  const {
    id,
    country,
    city,
    description,
    start_date,
    end_date,
    price,
    image_url,
  } = body;
  return {
    id,
    country,
    city,
    description,
    start_date,
    end_date,
    price,
    image_url,
  };
}

export { router };
