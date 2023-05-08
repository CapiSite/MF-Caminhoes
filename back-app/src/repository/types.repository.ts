import { prismaDb } from "@/config"

async function getCartTypes() {
  return prismaDb.cart_type.findMany()
}

async function getCartModels() {
  return prismaDb.cart_model.findMany()
}

async function getCartBrands() {
  return prismaDb.brands.findMany()
}

async function getCartWheels() {
  return prismaDb.wheel.findMany()
}

async function getStates() {
  return prismaDb.states.findMany()
}

export const typesRepository = {
  getCartBrands,
  getCartModels,
  getCartTypes,
  getCartWheels,
  getStates
}