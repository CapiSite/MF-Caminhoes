import { prismaDb } from "../config"

async function storageCode(code: string, user_id: number) {
  return prismaDb.password_recovery.create({
    data:{
      code,
      user_id
    }
  })
}

async function getCode(code: string, user_id: number) {
  const user = await prismaDb.password_recovery.findFirst({
    where:{
      user_id
    }
  })

  if( Number(user.code) !== Number(code)){
    return false
  }

  return user.id
}

async function deleteCode(code_id: number) {
  return prismaDb.password_recovery.delete({
    where:{
      id: code_id
    }
  })
}

export const codeRepository = {
  storageCode,
  getCode,
  deleteCode
}