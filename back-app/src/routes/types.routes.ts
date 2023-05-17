import { getBrands, getModels, getStates, getTypes, getWheels } from "../controllers";
import { Router } from "express";

const typesRouter = Router()

typesRouter
  .get("/models", getModels)
  .get("/types", getTypes)
  .get("/brands", getBrands)
  .get("/wheels", getWheels)
  .get("/states", getStates)

export { typesRouter }