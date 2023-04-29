import { createAdmin, loginAdmin, logoutAdmin } from "@/controllers/admin.controllers";
import { authenticateAdmin } from "@/middlewares";
import { Router } from "express";

const adminRouter = Router()

adminRouter
  .post("/signup", createAdmin)
  .post("/login", loginAdmin)
  .post("logout", authenticateAdmin, logoutAdmin)


export { adminRouter }