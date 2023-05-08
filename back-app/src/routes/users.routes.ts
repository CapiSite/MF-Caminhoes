import { createAdmin, loginAdmin, logoutAdmin } from "@/controllers/admin.controllers";
import { createUser, editUser, loginUser } from "@/controllers/users.controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { userLogin, userPost } from "@/models/users.models";
import { Router } from "express";
import { Response, Request } from "express";
import httpStatus from "http-status";

const usersRouter = Router()

usersRouter
  .get("/verify", authenticateToken, (req: Request, res :Response) => {res.sendStatus(httpStatus.OK)})
  .post("/signup", validateBody(userPost), createUser)
  .post("/login", validateBody(userLogin),  loginUser)
  .put("/", authenticateToken, validateBody(userPost) , editUser)

export { usersRouter }