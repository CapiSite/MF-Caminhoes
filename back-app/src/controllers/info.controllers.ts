import { infoService } from "@/services/info.service";
import { Request, Response } from "express"
import httpStatus from "http-status";

export async function getAllInfo(req: Request, res: Response) {
  try{
    const users = await infoService.getAllInfo()
    return res.status(httpStatus.OK).send(users)
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function addUserInfo(req: Request, res: Response) {
  const body = req.body

  try{
    await infoService.createInfo(body)
    return res.sendStatus(httpStatus.CREATED)
  }catch(error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error)
    }
  }
}

export async function deleteUserInfo(req: Request, res: Response) {
  const {id} = req.params

  try{
    await infoService.deleteInfo(Number(id))
    return res.sendStatus(httpStatus.OK)
  }catch(error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
  }
}

