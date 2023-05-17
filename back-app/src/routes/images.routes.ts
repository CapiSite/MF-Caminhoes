import { getMainImage, getSecondaryImage } from "@/controllers/image.controllers";
import { Request, Response } from "express";
import { Router } from "express";
import path from "path";

const imagesRouter = Router()

imagesRouter
  .get("/main/:src", getMainImage)
  .get("/secondary/:src", getSecondaryImage)

export { imagesRouter } 