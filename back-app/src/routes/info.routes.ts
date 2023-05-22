import { authenticateAdmin, validateBody } from "../middlewares";
import { Router } from "express";
import { userInfoPost } from "../models/visitant_info";
import { addUserInfo, deleteUserInfo, getAllInfo } from "../controllers/info.controllers";

const infoRouter = Router()

infoRouter
  .get("/", authenticateAdmin, getAllInfo)
  .post("/", validateBody(userInfoPost), addUserInfo)
  .delete("/:id", authenticateAdmin, deleteUserInfo)

export { infoRouter } 