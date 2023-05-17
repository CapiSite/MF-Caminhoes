import instance from './api';

export async function getMain(src: string) {
  console.log(src)
  const response = await instance.get(`/images/main/${src}`)
  return response.data
}

export async function getSecondary(src: string) {
  console.log(src)
  const response = await instance.get(`/images/main/${src}`)
  return response.data
}