import { UserInfo } from "../protocols";
import Joi from "joi";

export const emailPost = Joi.object <Omit<UserInfo, 'name' | 'phone'>> ({
  email: Joi.string().email().required()
})

export const codePost = Joi.object <{code: string, email: string}> ({
  email: Joi.string().email().required(),
  code: Joi.string().required()
})