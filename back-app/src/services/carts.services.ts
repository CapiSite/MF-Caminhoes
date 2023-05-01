import { UnauthorizedError } from "@/errors"
import { NotFoundError } from "@/errors/not-found-error"
import { cartsRepository } from "@/repository/carts.repository"

async function getAllCarts() {
  return await cartsRepository.getAllCarts()
}

async function getSpecificCart(id: number) {
  const cart =  await cartsRepository.getSpecificCart(id)
  if(!cart) throw NotFoundError("Carreta não encontrada")

  return cart
}

async function getMyCarts(user_id: number) {
  return await cartsRepository.getMyCarts(user_id)
}

async function validateCart(cart_id: number) {
  const cart =  await cartsRepository.getSpecificCart(cart_id)
  if(!cart) throw NotFoundError("Carreta não encontrada")

  return cartsRepository.validateCart(cart_id)
}

async function deleteMyCart(user_id: number, cart_id: number) {
  const cart =  await cartsRepository.getSpecificCart(cart_id)
  if(!cart) throw NotFoundError("Carreta não encontrada")

  if(cart.user_id !== user_id) throw UnauthorizedError("Dono da carreta não credenciado")

  return cartsRepository.deleteCart(cart_id)
}

async function deleteAnyCart(cart_id: number) {
  const cart =  await cartsRepository.getSpecificCart(cart_id)
  if(!cart) throw NotFoundError("Carreta não encontrada")

  return cartsRepository.deleteCart(cart_id)
}
export const cartsServices = {
  getAllCarts,
  getSpecificCart,
  getMyCarts,
  validateCart,
  deleteMyCart,
  deleteAnyCart
}