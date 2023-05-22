import instance from './api';

export async function sendEmail(body: {email: string}) {
  const response = await instance.post("/email/send", body)
  return response.data
}

export async function sendCode(body: {email: string, code: string}) {
  const response = await instance.post("/email/code", body)
  return response.data
}