import instance from './api';

export async function getWheels() {
  const response = await instance.get("/types/wheels")
  return response.data
}

export async function getTypes() {
  const response = await instance.get("/types/types")
  return response.data
}

export async function getModels() {
  const response = await instance.get("/types/models")
  return response.data
}

export async function getBrands() {
  const response = await instance.get("/types/brands")
  return response.data
}

export async function getStates() {
  const response = await instance.get("/types/states")
  return response.data
}
