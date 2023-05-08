import { prismaDb } from "@/config"
import { AdminCreation } from "@/protocols"

async function getAdminByUsername(username: string) {
  try {
    return prismaDb.admin.findFirst({
      where: {
        username
      }
    })

  } catch (err) {
    console.log(err)
  }
}

async function createAdmin(info: AdminCreation) {
  try {
    return prismaDb.admin.create({
      data: info
    })
  } catch (err) {
    console.log(err)
  }
}

async function loginAdmin(id: number) {
  try {
    return prismaDb.admin.update({
      where: {
        id
      },
      data: {
        active: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function logoutAdmin(id: number) {
  try {
    return prismaDb.admin.update({
      where: {
        id
      },
      data: {
        active: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const adminRepository = {
  getAdminByUsername,
  createAdmin,
  loginAdmin,
  logoutAdmin
}