import { AuthenticatedRequest, AuthenticatedRequestAdmin } from '@/protocols';
import { cartsServices } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAllCarts(req: Request, res: Response) {
  try {
    const carts = await cartsServices.getAllCarts()
    return res.status(httpStatus.OK).send(carts)

  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getUnvalidCarts(req: Request, res: Response) {
  try {
    const carts = await cartsServices.getUnvalidCarts()
    return res.status(httpStatus.OK).send(carts)

  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getSpecificCart(req: Request, res: Response) {
  const { cart_id } = req.params

  if(isNaN(Number(cart_id))) {return res.status(httpStatus.BAD_REQUEST).send("Carreta inválida")}

  try {
    const cart = await cartsServices.getSpecificCart(Number(cart_id))
    return res.status(httpStatus.OK).send(cart)

  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
  }
}

export async function getMyCarts(req: AuthenticatedRequest, res: Response) {
  try {
    const carts = await cartsServices.getMyCarts(req.user_id)
    return res.status(httpStatus.OK).send(carts)
    
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function createCart(req: AuthenticatedRequest, res: Response) {
  const body = req.body

  try {
    await cartsServices.createCart(body, req.user_id)
    return res.sendStatus(httpStatus.OK)

  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}

export async function editCart(req: AuthenticatedRequest, res: Response) {
  const body = req.body
  const { cart_id } = req.params

  try {
    const cart =await cartsServices.updateCart(body, req.user_id, Number(cart_id))
    return res.sendStatus(httpStatus.OK).send(cart)
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}

export async function deleteMyCart(req: AuthenticatedRequest, res: Response) {
  const { cart_id } = req.params

  if(isNaN(Number(cart_id))) {return res.status(httpStatus.BAD_REQUEST).send("Carreta inválida")}

  try {
    await cartsServices.deleteMyCart(req.user_id, Number(cart_id))
    return res.sendStatus(httpStatus.OK)

  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error)
    }
  }
}

export async function validateCart(req: AuthenticatedRequestAdmin, res: Response) {
  const { cart_id } = req.params

  if(isNaN(Number(cart_id))) {return res.status(httpStatus.BAD_REQUEST).send("Carreta inválida")}

  try {
    await cartsServices.validateCart(Number(cart_id))
    return res.sendStatus(httpStatus.CREATED)

  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
  }
}

export async function deleteCart(req: AuthenticatedRequestAdmin, res: Response) {
  const { cart_id } = req.params

  if(isNaN(Number(cart_id))) {return res.status(httpStatus.BAD_REQUEST).send("Carreta inválida")}

  try {
    await cartsServices.deleteAnyCart(Number(cart_id))
    return res.sendStatus(httpStatus.OK)

  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error)
    }
  }
}