import { prismaDb } from "@/config"
import { UserAddress } from "@/protocols"

async function createAddress(address: UserAddress) {
  const cityExist  = await cityExisting(address.city) 

  if (!cityExist) return await createAddressWithNewcity(address)

  return prismaDb.address.create({
    data: {
      cep: address.cep,
      address: address.address,
      complement: address.complement,
      number: address.number,
      city_id: cityExist.id
    }
  })
}

async function updateAddress(address: UserAddress, address_id: number, user_id: number) {
  const cityExist = await cityExisting(address.city)

  if (!cityExist) return await implementAddressWithNewcity(address, address_id, user_id)

  return prismaDb.address.update({
    where: {
      id: address_id
    },
    data: {
      cep: address.cep,
      address: address.address,
      complement: address.complement,
      number: address.number,
      city_id: cityExist.id
    }
  })
}

async function cityExisting(city: string) {
  const cityExist = await prismaDb.cities.findFirst({
    where: {
      name: city
    }
  })
  
  return cityExist
}

async function implementAddressWithNewcity(address: UserAddress, id: number, user_id: number) {

  const { address: User_address } = await prismaDb.users.findFirst({
    where: {
      id: user_id
    },
    include:{
      address: true
    }
  })

  const how_many = await prismaDb.address.findMany({
    where: {
      city_id: User_address.city_id
    }
  })

  if(how_many.length === 1 ) {
    await prismaDb.cities.delete({
      where:{
        id: User_address.id
      }
    })
  }

  const city = await prismaDb.cities.create({
    data: {
      name: address.city,
      state_id: address.state_id
    }
  })

  return prismaDb.address.update({
    where: {
      id
    },
    data: {
      cep: address.cep,
      address: address.address,
      complement: address.complement,
      number: address.number,
      city_id: city.id
    }
  })
}

async function createAddressWithNewcity(address: UserAddress) {
  const city = await prismaDb.cities.create({
    data: {
      name: address.city,
      state_id: address.state_id
    }
  })

  return prismaDb.address.create({
    data: {
      cep: address.cep,
      address: address.address,
      complement: address.complement,
      number: address.number,
      city_id: city.id
    }
  })
}

export const addressRepository = {
  createAddress,
  updateAddress
}