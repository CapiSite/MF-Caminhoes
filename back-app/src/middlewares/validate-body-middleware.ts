import { InvalidBodyError } from '../errors/invalid-data-error';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

export function validateBody (schema: ObjectSchema){
  return(req: Request, res: Response, next: NextFunction) => {
    const body = req.body 
  
    const { error } = schema.validate(body)

    if(error){
      res.status(httpStatus.BAD_REQUEST).send(InvalidBodyError(error.details.map((d) => d.message)))
      return
    }
    next()
  }
}