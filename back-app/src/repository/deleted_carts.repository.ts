import { prismaDb } from "../config"

async function createDeleted(title: string, main_image: string,user_id: number) {
  return prismaDb.deleted_carts.create({
    data:{
      title,
      main_image,
      user_id
    }
  })
}

async function getDeletedByUSerId(user_id: number) {
  return prismaDb.deleted_carts.findMany({
    where:{
      user_id
    }
  })
}

async function confirmSawAllDeletedByUserid(user_id: number) {
  return prismaDb.deleted_carts.deleteMany({
    where:{
      user_id
    }
  })
}

export const deletedRepository = {
  createDeleted,
  getDeletedByUSerId,
  confirmSawAllDeletedByUserid
}