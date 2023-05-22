import { sendEmail, verifyCode } from "../controllers/email.controllers";
import { Router } from "express";
import { validateBody } from "../middlewares";
import { codePost, emailPost } from "../models/email.models";

const emailsRouter = Router()

emailsRouter
  .post("/send", validateBody(emailPost), sendEmail)
  .post("/code", validateBody(codePost), verifyCode)

export { emailsRouter } 