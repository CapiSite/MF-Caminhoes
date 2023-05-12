import { prismaDb } from '@/config';
import { UnauthorizedError } from '@/errors/unauthorized-error';
import { AuthenticatedRequest } from '@/protocols';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const  authorization  = req.header("Authorization")
  if (!authorization) return unauthorizedError(res);

  const token = authorization.split(" ")[1];
  if (!token) return unauthorizedError(res);

  let expired = false

  try {
    const session = await prismaDb.sessions.findFirst({
      where: {
        token,
      },
    });
    
    if (!session || !session.active) return unauthorizedError(res);

    jwt.verify(session.token, process.env.JWT_SECRET, async (error, decoded) =>{
      if(error) {
        await prismaDb.sessions.delete({
          where:{
            id: session.id
          }
        })
        expired = true
      }
    })

    if(expired) return unauthorizedError(res)

    req.user_id = session.user_id;

    return next();
  } catch (err) {
    return unauthorizedError(res);
  }
}

function unauthorizedError(res: Response) {
  return res.status(httpStatus.UNAUTHORIZED).send(UnauthorizedError("Por favor, registre-se!"));
}


