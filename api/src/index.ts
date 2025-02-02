import express from "express";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { router as loginRouter } from "./login";
import { router as registerRouter } from "./register";
import { router as vacationsRouter } from "./vacations";
import { router as homepageRouter } from "./home";
import { router as followersRouter } from "./followers";

import bodyParser from "body-parser";
import cors from "cors";
import authenticate from "./middleware/authenticate";
import { limiter } from "./middleware/ratelimiter";

dotenv.config();
const app = express();
console.log("Application Start");
app.use(cors());
app.use(bodyParser.json());
app.use(limiter);
app.get("/health-check", async (req: Request, res: Response, next) => {
  return res.json({ massage: "server is up" });
});
app.use("/home", homepageRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.use(authenticate);

app.use("/vacations", vacationsRouter);
app.use("/followers", followersRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message, res.getHeader("x-request-id"));
  res.status(500).send("Something went wrong!");
});

app.listen(process.env.PORT, () => {
  console.log(`Application Listen to Port: ${process.env.PORT}`);
});
