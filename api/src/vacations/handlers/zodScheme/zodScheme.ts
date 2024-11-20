import { z } from "zod";



const idVacationScheme = z.number().optional()
const countryScheme = z.string()
const cityScheme = z.string()
const descriptionScheme = z.string().min(1).max(500)
const startScheme = z.string();
const endScheme = z.string();
const priceScheme = z.number()
const ImageScheme = z.string().url()


export const newVacationSchema = z.object({

  id: idVacationScheme,
  country: countryScheme,
  city: cityScheme,
  description: descriptionScheme,
  start_date: startScheme,
  end_date: endScheme,
  price: priceScheme,
  image_url: ImageScheme

})
