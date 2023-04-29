import { createAdmin, loginAdmin, logoutAdmin } from "@/controllers/admin.controllers";
import { createUser, editUser, loginUser } from "@/controllers/users.controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const usersRouter = Router()

usersRouter
  .post("/signup", createUser)
  .post("/login", loginUser)
  .put("/", authenticateToken, editUser)

export { usersRouter }