import { AuthenticatedRequestAdmin } from '@/protocols';
import { adminServices } from '@/services/admin.services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function createAdmin(req: Request, res: Response) {
  const { username, password } = req.body
  const { secret } = req.headers

  try{
    await adminServices.createAdmin(username, password, secret)
    return res.sendStatus(httpStatus.CREATED)

  }catch(error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error)
    }
  }
}

export async function loginAdmin(req: Request, res: Response) {
  const { username, password } = req.body

  try{
    const token = await adminServices.loginAdmin(username, password)
    return res.status(httpStatus.OK).send(token)
    
  }catch(error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}

export async function logoutAdmin(req: AuthenticatedRequestAdmin, res: Response) {
  try{
    await adminServices.logoutAdmin(req.admin_id)
    return res.sendStatus(httpStatus.OK)

  }catch(error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}