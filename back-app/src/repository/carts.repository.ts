import { prismaDb } from "@/config"
import { CartCreation } from "@/protocols"

async function getAllCarts() {
  return prismaDb.carts.findMany({
    include:{
      wheel: true,
      cart_model: true,
      cart_type: true,
      brands: true,
      cart_images: true
    }
  })
}

async function getSpecificCart(id:number) {
  return prismaDb.carts.findFirst({
    where:{
      id
    },
    include:{
      wheel: true,
      cart_model: true,
      cart_type: true,
      brands: true,
      cart_images: true
    }
  })
}

async function getMyCarts(user_id:number) {
  return prismaDb.carts.findMany({
    where:{
      user_id
    },
    include:{
      wheel: true,
      cart_model: true,
      cart_type: true,
      brands: true,
      cart_images: true
    }
  })
}

async function createCart(cart: CartCreation) {
  return prismaDb.carts.create({
    data: cart
  })
}

async function updateCart(cart: Omit<CartCreation, 'main_image'>, id: number) {
  return prismaDb.carts.update({
    where:{
      id
    },
    data: cart
  })
}

async function validateCart(cart_id: number) {
  return prismaDb.carts.update({
    where:{
      id: cart_id
    },
    data:{
      valid: true
    }
  })
}

async function deleteCart(id: number) {
  return prismaDb.carts.delete({
    where: {
      id
    }
  })
}

export const cartsRepository = {
  getAllCarts,
  getSpecificCart,
  getMyCarts,
  createCart,
  updateCart,
  validateCart,
  deleteCart
}