import { createAdmin, loginAdmin, logoutAdmin } from "@/controllers/admin.controllers";
import { authenticateAdmin, validateBody } from "@/middlewares";
import { adminPost } from "@/models/admin-repository";
import { Router } from "express";

const adminRouter = Router()

adminRouter
  .post("/signup", validateBody(adminPost), createAdmin)
  .post("/login", loginAdmin)
  .post("/logout", authenticateAdmin, logoutAdmin)


export { adminRouter }