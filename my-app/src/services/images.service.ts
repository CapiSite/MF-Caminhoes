import instance from './api';

export async function getMain(src: string) {
  const response = await instance.get(`/images/main/${src}`)
  return response.data
}

export async function getSecondary(src: string) {
  const response = await instance.get(`/images/main/${src}`)
  return response.data
}