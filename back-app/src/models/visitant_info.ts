import { UserInfo } from "../protocols";
import Joi from "joi";

export const userInfoPost = Joi.object<UserInfo> ({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(11).required(),
})