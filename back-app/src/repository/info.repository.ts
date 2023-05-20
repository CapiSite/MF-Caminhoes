import { UserInfo } from "@/protocols"
import { prismaDb } from "../config"

async function createInfo(body: UserInfo) {
  return prismaDb.visitant_info.create({
    data: body
  })
}

async function getAllInfo() {
  return prismaDb.visitant_info.findMany({})
}

async function getByEmail(email: string) {
  return prismaDb.visitant_info.findFirst({
    where:{
      email
    }
  })
}

async function getById(id: number) {
  return prismaDb.visitant_info.findFirst({
    where:{
      id
    }
  })
}

async function deleteInfo(id: number) {
  return prismaDb.visitant_info.delete({
    where:{
      id
    }
  })
}

export const userInfoRepository = {
  createInfo,
  deleteInfo,
  getByEmail,
  getById,
  getAllInfo
}