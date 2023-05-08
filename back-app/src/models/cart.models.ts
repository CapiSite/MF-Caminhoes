import { CartCreation, UserCreation } from "@/protocols";
import Joi from "joi";

export const cartPost = Joi.object<CartCreation> ({
  title: Joi.string().required(),
  description: Joi.string().required(),
  main_image: Joi.string().required(),
  secondary_images: Joi.array().required(),
  size: Joi.number().required(),
  color: Joi.string().required(),
  brand_id: Joi.number().required(),
  type_id: Joi.number().required(),
  model_id: Joi.number().required(),
  wheel_id: Joi.number().required(),
  price: Joi.number().required()
})