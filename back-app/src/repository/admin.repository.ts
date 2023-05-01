import { prismaDb } from "@/config"
import { AdminCreation } from "@/protocols"

async function getAdminByUsername(username: string) {
  return prismaDb.admin.findFirst({
    where:{
      username
    }
  })
}

async function createAdmin(info: AdminCreation) {
  return prismaDb.admin.create({
    data: info
  })
}

async function loginAdmin(id: number) {
  return prismaDb.admin.update({
    where:{
      id
    },
    data:{
      active: true
    }
  })
}

async function logoutAdmin(id: number) {
  return prismaDb.admin.update({
    where:{
      id
    },
    data:{
      active: true
    }
  })
}

export const adminRepository = {
  getAdminByUsername,
  createAdmin,
  loginAdmin,
  logoutAdmin
}