import { CartCreation, UserCreation } from "@/protocols";
import Joi from "joi";

export const cartPost = Joi.object<CartCreation> ({
  title: Joi.string().required(),
  description: Joi.string().required(),
  main_image: Joi.string().required(),
  secondary_images: Joi.array().required(),
  size: Joi.number().required(),
  color: Joi.string().required(),
  brand_id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  type_id:  Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  model_id:  Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  wheel_id:  Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  price: Joi.number().required(),
  year: Joi.number().required(),
  sections: Joi.number().required(),
  status: Joi.string().required()
})