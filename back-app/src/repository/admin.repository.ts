import { prismaDb } from "../config"
import { AdminCreation } from "../protocols"

async function getAdminByUsername(username: string) {
  try {
    return prismaDb.admin.findFirst({
      where: {
        username
      }
    })

  } catch (err) {
  }
}

async function createAdmin(info: AdminCreation) {
  try {
    return prismaDb.admin.create({
      data: info
    })
  } catch (err) {
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
  }
}

export const adminRepository = {
  getAdminByUsername,
  createAdmin,
  loginAdmin,
  logoutAdmin
}