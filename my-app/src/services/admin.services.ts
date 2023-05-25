import instance from './api';

export async function loginAdmin(body: any) {
  const response = await instance.post("/admin/login", body)
  return response.data
}

export async function signupAdmin(body: any, secret: string) {
  const response = await instance.post("/admin/signup", body, {headers: {Secret: secret}})
  return response.data
}

export async function logoutAdmin(token: string) {
  const response = await instance.post("/admin/logout", {}, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}