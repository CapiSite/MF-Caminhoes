import { ConflictError } from "@/errors";
import { NotFoundError } from "@/errors/not-found-error";
import { UserInfo } from "@/protocols";
import { userInfoRepository } from "@/repository/info.repository";

async function createInfo(body: UserInfo) {
  const email = await userInfoRepository.getByEmail(body.email)
  if(email) throw ConflictError("E-mail inválido")

  return userInfoRepository.createInfo(body)
} 

async function deleteInfo(id: number) {
  const info = await userInfoRepository.getById(id)
  if(!info) throw NotFoundError('Informações não encontradas')

  return userInfoRepository.deleteInfo(id)
} 

async function getAllInfo() {
  return userInfoRepository.getAllInfo()
}

export const infoService = {
  createInfo,
  deleteInfo,
  getAllInfo
}