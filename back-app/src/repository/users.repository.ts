import { prismaDb } from "@/config"
import { Userinfo } from "@/protocols"

async function getUserByCpf(cpf: string) {
  return prismaDb.users.findFirst({
    where:{
      cpf
    }
  })
}

async function getFullUserById(id: number) {
  return prismaDb.users.findFirst({
    where:{
      id
    },
    include:{
      address:{
        include:{
          cities:{
            include:{
              states: true
            }
          }
        }
      }
    }
  })
}

async function getUsersByEmail(email: string) {
  return prismaDb.users.findFirst({
    where:{
      email
    },
  })
}

async function createUser(user: Userinfo) {
  return prismaDb.users.create({
    data: user
  })
}

async function updateUser(user: Userinfo, user_id: number) {
  return prismaDb.users.update({
    where:{
      id: user_id
    },
    data: user

  })
}

export const usersRepository = {
  getUserByCpf,
  getFullUserById,
  getUsersByEmail,
  createUser,
  updateUser
}