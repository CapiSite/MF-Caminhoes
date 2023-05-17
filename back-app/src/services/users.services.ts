import { ConflictError, UnauthorizedError } from "../errors"
import { UserCreation } from "../protocols"
import { sessionsRepository } from "../repository/sessions.repository"
import { addressRepository } from "../repository/address.repository"
import { usersRepository } from "../repository/users.repository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { typesRepository } from "../repository/types.repository"
import { NotFoundError } from "../errors/not-found-error"

async function createUser(user: UserCreation) {

  const emailExist = await usersRepository.getUsersByEmail(user.email)
  if (emailExist) throw ConflictError("E-mail inválido")

  const cpfExist = await usersRepository.getUserByCpf(user.cpf)
  if (cpfExist) throw ConflictError("Cpf inválido")

  const state = await typesRepository.getStateById(user.address.state_id)
  if(!state) throw ConflictError("Estado inválido")

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
    const token = jwt.sign({ id: `${email}${fullUser.cpf}${password}`}, process.env.JWT_SECRET, {expiresIn: 604800})
    const session = await sessionsRepository.createSession(token, userExist.id)

    return { token: session.token, user: fullUser }
  }

  await sessionsRepository.activateSession(user_session.id)

  return { token: user_session.token, user: fullUser }
}

async function editUser(user: UserCreation, id: number) {
  const userExist = await usersRepository.getFullUserById(id)
  if (!userExist) throw UnauthorizedError("E-mail inválido")

  const userCpf = await usersRepository.getUserByCpf(user.cpf)
  if(userCpf && userCpf?.id  !== id) throw ConflictError("Cpf inválido")

  const newAddress = await addressRepository.updateAddress(user.address, userExist.address_id, userExist.id)

  return usersRepository.updateUser({
    cpf: user.cpf,
    name: user.name,
    phone: user.phone,
    address_id: newAddress.id
  },
    userExist.id)
}

async function forgotPassword(email: string, newPassword: string) {
  const fullUser = await usersRepository.getUsersByEmail(email)
  if(!fullUser) throw NotFoundError("E-mail inválido")

  const encryptedPassword = bcrypt.hashSync(newPassword, 12)

  return usersRepository.updateUserPassword(fullUser.id, encryptedPassword)
}

async function logoutUser(user_id: number) {
  const userExist = await usersRepository.getFullUserById(user_id)
  if (!userExist) throw UnauthorizedError("Usuaŕio inválido")

  return usersRepository.logoutUser(user_id)
}

async function deleteUser(user_id: number) {

  const userExist = await usersRepository.getFullUserById(user_id)
  if (!userExist) throw UnauthorizedError("Usuaŕio inválido")

  return usersRepository.deleteUser(user_id)
}

export const userServices = {
  createUser,
  loginUser,
  editUser,
  logoutUser,
  deleteUser,
  forgotPassword
}

