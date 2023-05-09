import { AuthenticatedRequest } from '@/protocols';
import { userServices } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function createUser(req: Request, res: Response) {
  const body = req.body

  try {
    await userServices.createUser(body)
    return res.sendStatus(httpStatus.CREATED)

  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error)
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const userAndToken = await userServices.loginUser(email, password)
    return res.status(httpStatus.OK).send(userAndToken)

  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }

}

export async function editUser(req: AuthenticatedRequest, res: Response) {
  const body = req.body

  try {
    const updatedInfo = await userServices.editUser(body, req.user_id)
    return res.status(httpStatus.CREATED).send(updatedInfo)
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error)
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}

export async function logoutUser(req: AuthenticatedRequest, res: Response) {

  try {
    const updatedInfo = await userServices.logoutUser(req.user_id)
    return res.status(httpStatus.CREATED).send(updatedInfo)
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error)
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}
