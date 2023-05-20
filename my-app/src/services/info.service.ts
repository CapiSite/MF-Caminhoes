import instance from './api';

export async function getAllInfo(adminToken: string) {
  const response = await instance.get(`/info/`, { headers: { Authorization: `Bearer ${adminToken}` } })
  return response.data
}

export async function addInfo(body: {name: string, email: string, phone: string}) {
  const response = await instance.post(`/info/`, body)
  return response.data
}

export async function deleteInfo(id: number, adminToken: string) {
  const response = await instance.delete(`/info/${id}`,  { headers: { Authorization: `Bearer ${adminToken}` } })
  return response.data
}