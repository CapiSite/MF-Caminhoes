import { prismaDb } from "@/config"
import { Userinfo } from "@/protocols"

async function getUserByCpf(cpf: string) {
  try {
    return prismaDb.users.findFirst({
      where: {
        cpf
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function getUserButCpfCanbeTheSame(cpf: string, user_id: number) {
  try {
    const user = await prismaDb.users.findFirst({
      where: {
        cpf
      }
    })

    if(user.id !== user_id) {
      return false
    }

    return true
  } catch (err) {
    console.log(err)
  }
}

async function getFullUserById(id: number) {
  try {
    return prismaDb.users.findFirst({
      where: {
        id
      },
      include: {
        address: {
          include: {
            cities: {
              include: {
                states: true
              }
            }
          }
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function getUsersByEmail(email: string) {
  try {
    return prismaDb.users.findFirst({
      where: {
        email
      },
    })
  } catch (err) {
    console.log(err)
  }
}

async function createUser(user: Userinfo) {
  try {
    return prismaDb.users.create({
      data: user
    })
  } catch (err) {
    console.log(err)
  }
}

async function updateUser(user: Omit<Userinfo, 'email' | 'password'>, user_id: number) {
  try {
    return prismaDb.users.update({
      where: {
        id: user_id
      },
      data: user
    })
  } catch (err) {
    console.log(err)
  }
}

async function logoutUser(user_id: number) {
  try {
    const session = await prismaDb.sessions.findFirst({
      where:{
        user_id
      }
    })

    return prismaDb.sessions.update({
      where: {
        id: session.id
      },
      data:{
        active: false
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const usersRepository = {
  getUserByCpf,
  getFullUserById,
  getUsersByEmail,
  createUser,
  updateUser,
  getUserButCpfCanbeTheSame,
  logoutUser
}