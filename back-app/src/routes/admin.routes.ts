import { createAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controllers";
import { authenticateAdmin, validateBody } from "../middlewares";
import { adminPost } from "../models/admin.models";
import { Router } from "express";

const adminRouter = Router()

adminRouter
  .post("/signup", validateBody(adminPost), createAdmin)
  .post("/login", validateBody(adminPost), loginAdmin)
  .post("/logout", authenticateAdmin, logoutAdmin)

export { adminRouter }