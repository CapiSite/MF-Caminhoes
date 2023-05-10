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

export async function verifyToken(token: string) {
  const response = await instance.get("/users/verify", {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}

export async function logoutUser(token: string) {
  const response = await instance.post("/users/logout",{}, {headers: {Authorization: `Bearer ${token}`}})
  return response.data

}

export async function deleteUser(token: string) {
  const response = await instance.delete("/users/", {headers: {Authorization: `Bearer ${token}`}})
  return response.data
}
