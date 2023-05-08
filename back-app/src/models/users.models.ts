import { UserCreation, UserLogin } from "@/protocols";
import Joi from "joi";

export const userPost = Joi.object<UserCreation> ({
  cpf: Joi.string().length(11).required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().length(11).required(),
  address: {
    cep: Joi.string().length(8).required(),
    address: Joi.string().required(),
    complement: Joi.string(),
    number: Joi.number(),
    city: Joi.string().required(),
    state_id: Joi.number().required()
  }
})

export const userLogin = Joi.object<UserLogin> ({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})