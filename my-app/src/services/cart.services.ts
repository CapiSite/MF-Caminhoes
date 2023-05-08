import instance from './api';

export async function getAllCarts() {
  const response = await instance.post("/carts/", )
  return response.data
}

export async function getSpecificCart(id: number) {
  const response = await instance.get(`/carts/${id}`, )
  return response.data
}

export async function getMyCarts(token: string) {
  const response = await instance.get("/carts/mine", {headers: {Authorization: `Bearer ${token}`}} )
  return response.data
}

export async function postCart(body: CartCreation, token: string) {
  const response = await instance.post("/carts/", body , {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function postCartPhotosMain(body: FormData, token: string) {
  const response = await instance.post("/carts/photos/main", body , {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}})
  return response.data
}

export async function postCartPhotosSecondary(body: FormData, token: string) {
  const response = await instance.post("/carts/photos/secondary", body , {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}})
  return response.data
}

export async function updateCart(body: any, id: number, token: string) {
  const response = await instance.put(`/carts/${id}`, body, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function deleteMyCart(id: number,  token: string) {
  const response = await instance.delete(`/carts/mine/${id}`, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function deleteAnyCart(id: number,  AdminToken: string) {
  const response = await instance.delete(`/carts/${id}`, {headers: {Authorization: `Bearer ${AdminToken}`}})
  return response.data
}

export async function ValidateCart(id: number,  AdminToken: string) {
  const response = await instance.post(`/carts/${id}/validate`, {},  {headers: {Authorization: `Bearer ${AdminToken}`}})
  return response.data
}

export type CartCreation = {
  title: string,
  description: string,
  main_image: string,
  secondary_images: string[],
  size: number,
  color: string,
  brand_id: number,
  type_id: number,
  model_id: number,
  wheel_id: number,
  price: number
}