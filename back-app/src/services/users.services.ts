import { ConflictError, UnauthorizedError } from "@/errors"
import { UserCreation } from "@/protocols"
import { sessionsRepository } from "@/repository/sessions.repository"
import { addressRepository } from "@/repository/address.repository"
import { usersRepository } from "@/repository/users.repository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function createUser(user: UserCreation) {

  const emailExist = await usersRepository.getUsersByEmail(user.email)
  if (emailExist) throw ConflictError("E-mail já usado")

  const cpfExist = await usersRepository.getUserByCpf(user.cpf)
  if (cpfExist) throw ConflictError("Cpf já em uso")

  const address = await addressRepository.createAddress(user.address)

  const encryptedPassword = bcrypt.hashSync(user.password, 12)

  return usersRepository.createUser({
    name: user.name,
    phone: user.phone,
    cpf: user.cpf,
    email: user.email,
    password: encryptedPassword,
    address_id: address.id
  })
}

async function loginUser(email: string, password: string) {
  const userExist = await usersRepository.getUsersByEmail(email)
  if (!userExist) throw UnauthorizedError("E-mail ou senha incorretos")

  const isValid = bcrypt.compareSync(password, userExist.password)
  if (!isValid) throw UnauthorizedError("E-mail ou senha incorretos")

  const fullUser = await usersRepository.getFullUserById(userExist.id)

  const user_session = await sessionsRepository.getSessionByUserId(userExist.id)

  if (!user_session) {
    const token = jwt.sign(password, process.env.JWT_SECRET)
    const session = await sessionsRepository.createSession(token, userExist.id)

    return { token: session.token, user: fullUser }
  }

  return { token: user_session.token, user: fullUser }
}

async function editUser(user: UserCreation, id: number) {
  const userExist = await usersRepository.getFullUserById(id)
  if (!userExist) throw UnauthorizedError("Usuaŕio não cadastrado")

  const cpfValid = await usersRepository.getUserButCpfCanbeTheSame(user.cpf, id)
  if (!cpfValid) throw ConflictError("Cpf já em uso")

  const newAddress = await addressRepository.updateAddress(user.address, userExist.address_id, userExist.id)

  return usersRepository.updateUser({
    cpf: user.cpf,
    name: user.name,
    phone: user.phone,
    address_id: newAddress.id
  },
    userExist.id)
}

async function logoutUser(user_id: number) {
  const userExist = await usersRepository.getFullUserById(user_id)
  if (!userExist) throw UnauthorizedError("Usuaŕio não cadastrado")

  return usersRepository.logoutUser(user_id)
}

export const userServices = {
  createUser,
  loginUser,
  editUser,
  logoutUser

}

