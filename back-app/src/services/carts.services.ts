import { UnauthorizedError } from "../errors"
import { NotFoundError } from "../errors/not-found-error"
import { CartCreation, CartCreationDefinitive } from "../protocols"
import { cartsRepository } from "../repository/carts.repository"
import { deletedRepository } from "../repository/deleted_carts.repository"
import { typesRepository } from "../repository/types.repository"
import { usersRepository } from "../repository/users.repository"

async function getAllCarts() {
  return await cartsRepository.getAllCarts()
}

async function getUnvalidCarts() {
  return await cartsRepository.getUnvalidCarts()
}

async function getSpecificCart(id: number) {
  const cart =  await cartsRepository.getSpecificCart(id)
  if(!cart) throw NotFoundError("Carreta não encontrada")

  return cart
}

async function getMyCarts(user_id: number) {
  const active = await cartsRepository.getMyCarts(user_id)
  const canceled = await deletedRepository.getDeletedByUSerId(user_id)

  return {
    active,
    canceled
  }
}

async function confirmSawDeletedCarts(user_id: number){
  return deletedRepository.confirmSawAllDeletedByUserid(user_id)
}

async function createCart(body: CartCreation, user_id: number) {
  const user = await usersRepository.getFullUserById(user_id)
  if(!user) throw UnauthorizedError("Usuário não cadastrado")


  if( typeof(body.brand_id) === "string"){ 
    const brand = await typesRepository.addBrands(body.brand_id as string)
    body.brand_id = brand.id
  }

  if( typeof(body.wheel_id) === "string"){ 
    const wheel = await typesRepository.addWheels(body.wheel_id as string)
    body.wheel_id = wheel.id
  }

  if( typeof(body.model_id) === "string"){ 
    const model = await typesRepository.addModels(body.model_id as string)
    body.model_id = model.id
  }

  if( typeof(body.type_id) === "string"){ 
    const type = await typesRepository.addTypes(body.type_id as string)
    body.type_id = type.id
  }

  return await cartsRepository.createCart(body as CartCreationDefinitive, user_id)
}

async function updateCart(body: CartCreation, user_id: number, cart_id : number) {

  const user = await usersRepository.getFullUserById(user_id)
  if(!user) throw UnauthorizedError("Usuário não cadastrado")

  const cart = await cartsRepository.getSpecificCart(cart_id)
  if(!cart) throw NotFoundError("Carreta nã encontrada")

  if( typeof(body.brand_id) === "string"){ 
    const brand = await typesRepository.addBrands(body.brand_id as string)
    body.brand_id = brand.id
  }

  if( typeof(body.wheel_id) === "string"){ 
    const wheel = await typesRepository.addWheels(body.wheel_id as string)
    body.wheel_id = wheel.id
  }

  if( typeof(body.model_id) === "string"){ 
    const model = await typesRepository.addModels(body.model_id as string)
    body.model_id = model.id
  }

  if( typeof(body.type_id) === "string"){ 
    const type = await typesRepository.addTypes(body.type_id as string)
    body.type_id = type.id
  }

  const cartRE = await cartsRepository.updateCart(body as CartCreationDefinitive, cart_id, user_id)

  return cartRE
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

  await deletedRepository.createDeleted(cart.title, cart.main_image, cart.user_id)

  return cartsRepository.deleteCart(cart_id)
}

export const cartsServices = {
  getAllCarts,
  getSpecificCart,
  getMyCarts,
  validateCart,
  deleteMyCart,
  deleteAnyCart,
  createCart,
  getUnvalidCarts,
  updateCart,
  confirmSawDeletedCarts
}