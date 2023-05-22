import { emailServices } from '@/services/email.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function sendEmail(req: Request, res: Response) {
  const { email } = req.body

  try {
    await emailServices.sendEmail(email)
    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function verifyCode(req: Request, res: Response) {
  const { email, code } = req.body

  try {
    await emailServices.verifyCode(email, code)
    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}