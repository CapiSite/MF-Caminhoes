import { prismaDb } from "@/config"
import { UserAddress } from "@/protocols"

async function createAddress(address: UserAddress) {
  try {
    const cityExist = await cityExisting(address.city)

    if (!cityExist) {
      return createAddressWithNewcity(address)
    }

    return prismaDb.address.create({
      data: {
        cep: address.cep,
        address: address.address,
        complement: address.complement,
        number: address.number,
        city_id: cityExist.id
      }
    })
  }catch(err) {
  }
}

async function updateAddress(address: UserAddress, address_id: number, user_id: number) {
  try {
    const cityExist = await cityExisting(address.city)

    if (!cityExist) return await implementAddressWithNewcity(address, address_id, user_id)

    return await prismaDb.address.update({
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

  }catch(err) {
  }

}

async function cityExisting(city: string) {
  try {
    const cityExist = await prismaDb.cities.findFirst({
      where: {
        name: city
      }
    })

    return cityExist
  }catch(err) {
  }
}

async function implementAddressWithNewcity(address: UserAddress, id: number, user_id: number) {
  try {
    const { address: User_address } = await prismaDb.users.findFirst({
      where: {
        id: user_id
      },
      include: {
        address: true
      }
    })

    const how_many = await prismaDb.address.findMany({
      where: {
        city_id: User_address.city_id
      }
    })

    if (how_many.length === 1) {
      await prismaDb.cities.delete({
        where: {
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

    return await prismaDb.address.update({
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

  }catch(err) {
  }
}

async function createAddressWithNewcity(address: UserAddress) {
  try{
    const city = await prismaDb.cities.create({
      data: {
        name: address.city,
        state_id: address.state_id
      }
    })
  
    return await prismaDb.address.create({
      data: {
        cep: address.cep,
        address: address.address,
        complement: address.complement,
        number: address.number,
        city_id: city.id
      }
    })
  }catch(err) {
  }
  
}

export const addressRepository = {
  createAddress,
  updateAddress
}