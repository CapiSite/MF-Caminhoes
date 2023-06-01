import { Request, Response } from "express"
import path from "path"
import fs from 'fs';
import httpStatus from "http-status";

export async function getMainImage(req: Request, res: Response) {
  const { src } = req.params
  const imagePath = path.resolve(__dirname, "..", "public", "main", src)

  if (!imagePath) {
    return res.sendStatus(httpStatus.CREATED)
  }
  
  try {
    const image = fs.readFileSync(imagePath);
    return res.send(image);
  }
  catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND)
  }
}

export async function getSecondaryImage(req: Request, res: Response) {
  const { src } = req.params
  const imagePath = path.resolve(__dirname, "..", "public", "secondary", src)

  if (!imagePath) {
    return res.sendStatus(httpStatus.NOT_FOUND)
  }

  try {
    const image = fs.readFileSync(imagePath);
    return res.send(image);
  }
  catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND)
  }
}