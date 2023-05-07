import instance from './api';

export async function loginUser(body: any) {
  const response = await instance.post("/users/login", body)
  return response.data
}

export async function signupUser(body: any) {
  const response = await instance.post("/users/signup", body)
  return response.data
}

export async function updateUser(body:any, token: string) {
  const response = await instance.put("/users/", body, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}