import { AdminCreation } from "../protocols";
import Joi from "joi";

export const adminPost = Joi.object<AdminCreation> ({
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$')).required()
})