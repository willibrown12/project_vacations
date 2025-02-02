import express from "express";

import { jwtDecode } from "jwt-decode";

import { getFollowers } from "./handlers/getFollowers";
import getTokenFromHeaders from "../middleware/handlers/getTokenFromHeader";
import { followVacation } from "./handlers/followVacation";
import { deleteFollowVacation } from "./handlers/unfolllowVacation";

const router = express.Router();

export type TokenPayload = {
  fullName: string;
  role: string;
  idUser: number;
};

router.get("/", async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    const decoded: TokenPayload = jwtDecode(token);
    const data = await getFollowers(decoded.idUser);
    res.json({ Followers: data });
  } catch (error) {
    next(error)
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    const decoded: TokenPayload = jwtDecode(token);
    const result = await followVacation(+req.params.id, decoded.idUser);
    return res.status(200).json({ message: "follow", data: result });
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    const decoded: TokenPayload = jwtDecode(token);

    const result = await deleteFollowVacation(+req.params.id, decoded.idUser);
    return res.status(200).json({ message: "unfollow", data: result });
  } catch (error) {
    next(error)
  }
});

export { router };
