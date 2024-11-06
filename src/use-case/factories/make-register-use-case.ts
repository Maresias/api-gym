import { PrismaUserRepository } from '@/repositories/pisma/prisma-user-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterUserCase() {
  const userRepository = new PrismaUserRepository()
  const registerUserCase = new RegisterUserCase(userRepository)

  return registerUserCase
}
