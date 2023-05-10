import { prismaDb } from "@/config"

async function getCartTypes() {
  return prismaDb.cart_type.findMany({
    where:{
      valid: true
    }
  })
}

async function getCartModels() {
  return prismaDb.cart_model.findMany({
    where:{
      valid: true
    }
  })
}

async function getCartBrands() {
  return prismaDb.brands.findMany({
    where:{
      valid: true
    }
  })
}

async function getCartWheels() {
  return prismaDb.wheel.findMany(
    {
      where:{
        valid: true
      }
    }
  )
}

async function getStates() {
  return prismaDb.states.findMany()
}

async function addTypes(name: string) {
  return prismaDb.cart_type.create({
    data: {name}
  })
}

async function addModels(name: string) {
  return prismaDb.cart_model.create({
    data: {name}
  })
}

async function addBrands(name: string) {
  return prismaDb.brands.create({
    data: {name}
  })
}

async function addWheels(name: string) {
  return prismaDb.wheel.create({
    data: {name}
  })
}

export const typesRepository = {
  getCartBrands,
  getCartModels,
  getCartTypes,
  getCartWheels,
  getStates,
  addBrands,
  addModels,
  addTypes,
  addWheels
}