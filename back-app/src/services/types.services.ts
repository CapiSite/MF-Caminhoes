import { typesRepository } from "../repository/types.repository"

async function getTypes() {
  return await typesRepository.getCartTypes()
}

async function getBrands() {
  return await typesRepository.getCartBrands()
}

async function getModels() {
  return await typesRepository.getCartModels()

}

async function getWheels() {
  return await typesRepository.getCartWheels()
}

async function getStates() {
  return await typesRepository.getStates()
}

export const typesService = {
  getBrands,
  getModels,
  getTypes,
  getWheels,
  getStates
}