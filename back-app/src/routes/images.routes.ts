import { getMainImage, getSecondaryImage } from "../controllers/image.controllers";
import { Router } from "express";

const imagesRouter = Router()

imagesRouter
  .get("/main/:src", getMainImage)
  .get("/secondary/:src", getSecondaryImage)

export { imagesRouter } 