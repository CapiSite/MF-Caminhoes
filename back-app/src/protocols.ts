import { ValidationError } from "joi"
import { Request } from "express";
import { carts } from "@prisma/client";

export type ErrorCase = {
  name: String,
  message: String | String[] | ValidationError
}

export type AuthenticatedRequest = Request & JWTPayload;
export type AuthenticatedRequestAdmin = Request & JWTPayloadADmin

type JWTPayload = {
  user_id: number;
};

type JWTPayloadADmin = {
  admin_id: number;
};

export type UserLogin = {
  email: string,
  password: string
}

export type UserCreation = {
  cpf: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  address: {
    cep: string,
    address: string,
    complement: string,
    number: string,
    city: string,
    state_id: number
  }
}

export type UserAddress = {
  cep: string,
  address: string,
  complement: string,
  number: string,
  city: string,
  state_id: number
}

export type Userinfo = {
  cpf: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  address_id: number
}

export type AdminCreation = {
  username: string,
  password: string,
  token: string,
  active: boolean
}

export type CartCreation = {
  title: string,
  description: string,
  main_image: string,
  secondary_images: string[],
  size: number,
  color: string,
  brand_id: number | string,
  type_id: number | string,
  model_id: number | string,
  wheel_id: number | string,
  price: number,
  year: number,
  status: string,
  sections: number
}

export type CartCreationDefinitive = {
  title: string,
  description: string,
  main_image: string,
  secondary_images: string[],
  size: number,
  color: string,
  brand_id: number,
  type_id: number,
  model_id: number,
  wheel_id: number,
  price: number,
  year: number,
  status: string,
  sections: number
}