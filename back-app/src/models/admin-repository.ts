import { AdminCreation, UserCreation, UserLogin } from "@/protocols";
import Joi from "joi";

export const adminPost = Joi.object<AdminCreation> ({
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')).required()
})