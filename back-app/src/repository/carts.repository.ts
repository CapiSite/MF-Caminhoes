import { prismaDb } from "@/config"
import { CartCreation } from "@/protocols"

async function getAllCarts() {
  try {
    return prismaDb.carts.findMany({
      include: {
        wheel: true,
        cart_model: true,
        cart_type: true,
        brands: true,
        cart_images: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function getSpecificCart(id: number) {
  try {
    return prismaDb.carts.findFirst({
      where: {
        id
      },
      include: {
        wheel: true,
        cart_model: true,
        cart_type: true,
        brands: true,
        cart_images: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function getMyCarts(user_id: number) {
  try {
    return prismaDb.carts.findMany({
      where: {
        user_id
      },
      include: {
        wheel: true,
        cart_model: true,
        cart_type: true,
        brands: true,
        cart_images: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function createCart(cart: CartCreation) {
  try {
    const images = cart.secondary_images.map(e =>{
      return{
        cart_id: cartReceived.id,
        src: e
      }
    })

    delete cart.secondary_images
    const cartReceived = await prismaDb.carts.create({
      data: cart
    })

    prismaDb.cart_images.createMany({
      data: images
    })

  } catch (err) {
    console.log(err)
  }
}

async function updateCart(cart: Omit<CartCreation, 'main_image'>, id: number) {
  try {
    return prismaDb.carts.update({
      where: {
        id
      },
      data: cart
    })
  } catch (err) {
    console.log(err)
  }
}

async function validateCart(cart_id: number) {
  try {
    return prismaDb.carts.update({
      where: {
        id: cart_id
      },
      data: {
        valid: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function deleteCart(id: number) {
  try {
    return prismaDb.carts.delete({
      where: {
        id
      }
    })
  } catch (err) {
    console.log(err)
  }
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