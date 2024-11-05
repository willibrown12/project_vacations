import express from "express";

import { createVacation } from "./handlers/createVacation";
import { deleteVacation } from "./handlers/deleteVacation";
import { updateVacation } from "./handlers/updateVacation";
import { z } from "zod";
import { isAdmin } from "../middleware/isadmin";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../followers";
import getTokenFromHeaders from "../middleware/handlers/getTokenFromHeader";
import { getVacations } from "./handlers/getVacations";
import { filterVacation } from "./handlers/filtervacation";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getVacations();
    res.json({ vacations: data });
  } catch (error) {
    res.send("Something went wrong");
  }
});

router.get("/filter/:value", async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    const decoded :TokenPayload= jwtDecode(token);
    const queryParams = req.params.value;
    const data = await filterVacation(queryParams,decoded.idUser);
    res.json({ vacations: data });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});





router.post("/", isAdmin, async (req, res, next) => {
  try {
    
    newVacationSchema.parse(req.body)
    const newVacation: VacationType = extractVacation(req.body);
    const result = await createVacation(newVacation);
    return res.status(200).json({ message: "vacation added", data: result})
  } catch (error) {
    res.send(error);
    console.log(error);
    
  }
});

router.delete("/:idToDelete", isAdmin, async (req, res, next) => {
  try {
    const affectedRows = await deleteVacation(+req.params.idToDelete);

    if (affectedRows > 0) {
      res.status(200).json({ message: "Vacation deleted successfully", affectedRows });
    } else {
      res.status(404).json({ message: "Vacation not found" });
    }
  } catch (error) {
    console.error("Error deleting vacation:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:idToUpdate", isAdmin, async (req, res, next) => {
  try {
    newVacationSchema.parse(req.body)

    const vacationToUpdate = extractVacation(req.body);
    console.log(vacationToUpdate, req.params.idToUpdate);
    const affectedRows = await updateVacation(
      +req.params.idToUpdate,
      vacationToUpdate
    );
    res.json({ affectedRows });
  } catch (error) {
    console.log((error as any).message);
    res.send("Something went wrong");
  }
});




export type VacationType = {

  id?: number;
  country: string;
  city: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number,
  followers_count:number
  image_url: string

}


function extractVacation(body: any): VacationType {
  const { id, country, city, description, start_date, end_date, price,followers_count, image_url } = body;
  return { id, country, city, description, start_date, end_date, price,followers_count, image_url };
}


const idVacationScheme = z.number().optional()
const countryScheme = z.string()
const cityScheme = z.string()
const descriptionScheme = z.string().min(5).max(100)
const startScheme = z.string();
const endScheme = z.string();
const priceScheme = z.number()
const ImageScheme = z.string().url()
const followersScheme = z.number()

const newVacationSchema = z.object({

  id: idVacationScheme,
  country: countryScheme,
  city: cityScheme,
  description: descriptionScheme,
  start_date: startScheme,
  end_date: endScheme,
  price: priceScheme,
  followers_count:followersScheme,
  image_url: ImageScheme

})





export { router }