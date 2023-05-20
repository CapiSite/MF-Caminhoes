import { carts } from "@prisma/client"
import { prismaDb } from "../config"
import { CartCreationDefinitive } from "../protocols"

async function getAllCarts() {
  //alterar depois para adicionar where valid:true
  try {
    return prismaDb.carts.findMany({
      include: {
        wheel: true,
        cart_model: true,
        cart_type: true,
        brands: true,
        cart_images: true
      },
      where: {
        valid: true
      }
    })
  } catch (err) {
  }
}

async function getUnvalidCarts() {
  try {
    return prismaDb.carts.findMany({
      include: {
        wheel: true,
        cart_model: true,
        cart_type: true,
        brands: true,
        cart_images: true
      },
      where: {
        valid: false
      }
    })
  } catch (err) {
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
        cart_images: true,
      }
    })
  } catch (err) {
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
  }
}

async function createCart(cart: CartCreationDefinitive, user_id: number) {
  try {
    const cartCreation = { ...cart }
    delete cartCreation.secondary_images

    const cartReceived = await prismaDb.carts.create({
      data: { ...cartCreation, user_id }
    })


    const images = cart.secondary_images.map((e) => {
      return {
        cart_id: cartReceived.id,
        src: e
      }
    })

    return prismaDb.cart_images.createMany({
      data: images
    })

  } catch (err) {
  }
}

async function updateCart(cart: CartCreationDefinitive, id: number, user_id: number) {
  try {

    if (cart.secondary_images) {
      await prismaDb.cart_images.deleteMany({
        where: {
          cart_id: id
        }
      })

      const info = cart.secondary_images.map((e) => { return { src: e, cart_id: id } })

      await prismaDb.cart_images.createMany({
        data: info
      })
    }

    delete cart.secondary_images

    return prismaDb.carts.update({
      where: {
        id
      },
      data: { ...cart, user_id }
    })
  } catch (err) {
  }
}

async function validateCart(cart_id: number) {
  try {
    const cart = await prismaDb.carts.update({
      where: {
        id: cart_id
      },
      data: {
        valid: true
      }
    })

    await prismaDb.cart_model.update({
      where: {
        id: cart.model_id
      },
      data: {
        valid: true
      }
    })

    await prismaDb.cart_type.update({
      where: {
        id: cart.type_id
      },
      data: {
        valid: true
      }
    })

    await prismaDb.brands.update({
      where: {
        id: cart.brand_id
      },
      data: {
        valid: true
      }
    })

    await prismaDb.wheel.update({
      where: {
        id: cart.wheel_id
      },
      data: {
        valid: true
      }
    })

    return cart

  } catch (err) {
  }
}

async function deleteCart(id: number) {
  try {
    const deleted = await prismaDb.carts.delete({
      where: {
        id
      }
    })

    const how_many_1 = await prismaDb.carts.findMany({
      where: {
        type_id: deleted.type_id
      }
    })
    const how_many_2 = await prismaDb.carts.findMany({
      where: {
        model_id: deleted.model_id
      }
    })
    const how_many_3 = await prismaDb.carts.findMany({
      where: {
        brand_id: deleted.brand_id
      }
    })
    const how_many_4 = await prismaDb.carts.findMany({
      where: {
        wheel_id: deleted.wheel_id
      }
    })

    await deleteType(how_many_1, 'cart_type', deleted, 'type_id' )
    await deleteType(how_many_2, 'cart_model', deleted, 'model_id')
    await deleteType(how_many_3, 'brands', deleted, 'brand_id')
    await deleteType(how_many_4, 'wheel', deleted, 'wheel_id')

    return deleted
    
  } catch (err) {
  }
}

async function deleteType(list: carts[], type: string, deleted: carts, deletedField: string) {

  if(list.length === 0) {
    const model = await prismaDb[type].findFirst({
      where: {
        id: deleted[deletedField],
        undeletable: false
      }
      
    })
    if(model) {
      await prismaDb[type].delete({
        where: {
          id: deleted[deletedField]
        }
      })
    }
  }
}

export const cartsRepository = {
  getAllCarts,
  getSpecificCart,
  getMyCarts,
  createCart,
  updateCart,
  validateCart,
  deleteCart,
  getUnvalidCarts,
}