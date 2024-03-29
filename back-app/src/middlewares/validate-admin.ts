import { prismaDb } from '../config';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { AuthenticatedRequestAdmin } from '../protocols';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

export async function authenticateAdmin(req: AuthenticatedRequestAdmin, res: Response, next: NextFunction) {
  const  authorization  = req.header("Authorization")
  if (!authorization) return unauthorizedError(res);

  const token = authorization.split(" ")[1];
  if (!token) return unauthorizedError(res);

  try {
    const admin = await prismaDb.admin.findFirst({
      where: {
        token,
      },
    });
    
    if (!admin || !admin.active) return unauthorizedError(res);

    jwt.verify(admin.token, process.env.JWT_SECRET, async (error, decoded) =>{
      if(error) {
        return unauthorizedError(res)
      }
    })

    req.admin_id = admin.id;

    return next();
  } catch (err) {
    return unauthorizedError(res);
  }
}

function unauthorizedError(res: Response) {
  return res.status(httpStatus.UNAUTHORIZED).send(UnauthorizedError("Invalid credentials"));
}


