import { ConflictError, UnauthorizedError } from "@/errors"
import { adminRepository } from "@/repository/admin.repository"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function createAdmin(username: string, password: string, secret_password: string | string[]) {
  if(secret_password !== process.env.ADMIN_PASSWORD) throw UnauthorizedError("Senha Secreta incorreta")

  const adminExist = await  adminRepository.getAdminByUsername(username)
  if(adminExist) throw ConflictError("Nome de usuário já em uso")

  const token = jwt.sign(`${password}${secret_password}${username}`, process.env.JWT_SECRET)

  const uncryptedPassword = bcrypt.hashSync(password, 12)

  return adminRepository.createAdmin({username, password: uncryptedPassword, token ,active: false})
}

async function loginAdmin(username: string, password: string) {
  const adminExist = await adminRepository.getAdminByUsername(username)
  if(!adminExist) throw UnauthorizedError("nome ou senha incorretos")

  const isValid = bcrypt.compareSync(password, adminExist.password)
  if(!isValid) throw UnauthorizedError("nome ou senha incorretos")

  await adminRepository.loginAdmin(adminExist.id)

  return adminExist.token

}

async function logoutAdmin(admin_id: number) {
  return adminRepository.logoutAdmin(admin_id)
}

export const adminServices = {
  createAdmin,
  loginAdmin,
  logoutAdmin
}