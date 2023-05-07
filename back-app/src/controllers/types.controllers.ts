import { typesService } from "@/services"
import { Response, Request } from "express"
import httpStatus from "http-status"

export async function getTypes(req: Request, res: Response) {
  try{
    const types = await typesService.getTypes()
    return res.status(httpStatus.OK).send(types)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getBrands(req: Request, res: Response) {
  try{
    const brands = await typesService.getBrands()
    return res.status(httpStatus.OK).send(brands)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getWheels(req: Request, res: Response) {
  try{
    const wheels = await typesService.getWheels()
    return res.status(httpStatus.OK).send(wheels)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getModels(req: Request, res: Response) {
  try{
    const models = await typesService.getModels()
    return res.status(httpStatus.OK).send(models)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getStates(req: Request, res: Response) {
  try{
    const states = await typesService.getStates()
    return res.status(httpStatus.OK).send(states)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}