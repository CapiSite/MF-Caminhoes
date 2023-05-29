import { UserCreation, UserLogin } from "../protocols";
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
    complement: Joi.string().allow(null, ''),
    number: Joi.string().required(),
    city: Joi.string().required(),
    state_id: Joi.number().required()
  }
})

export const userUpdate = Joi.object<UserCreation> ({
  cpf: Joi.string().length(11).required(),
  name: Joi.string().required(),
  phone: Joi.string().length(11).required(),
  address: {
    cep: Joi.string().length(8).required(),
    address: Joi.string().required(),
    complement: Joi.string().allow(null, ''),
    number: Joi.string().required(),
    city: Joi.string().required(),
    state_id: Joi.number().required()
  }
})

export const userLogin = Joi.object<UserLogin> ({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const forgotPassword = Joi.object<UserLogin> ({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})