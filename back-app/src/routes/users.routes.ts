import { createUser, deleteUser, editUser, loginUser, logoutUser } from "@/controllers/users.controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { forgotPassword, userLogin, userPost, userUpdate } from "@/models/users.models";
import { AuthenticatedRequest } from "@/protocols";
import { Router } from "express";
import { Response, Request } from "express";
import httpStatus from "http-status";

const usersRouter = Router()

usersRouter
  .get("/verify", authenticateToken, (req: AuthenticatedRequest, res :Response) => res.sendStatus(httpStatus.OK))
  .post("/signup", validateBody(userPost), createUser)
  .post("/login", validateBody(userLogin),  loginUser)
  .post("/logout", authenticateToken, logoutUser)
  .post("/password", validateBody(forgotPassword))
  .put("/", authenticateToken, validateBody(userUpdate) , editUser)
  .delete("/", authenticateToken, deleteUser)

export { usersRouter }