import { PrismaUserRepository } from '@/repositories/pisma/prisma-user-repository'
import { AuthenticateUserCase } from '../authenticate'

export function makeauthenticateUserCase() {
  const userRepository = new PrismaUserRepository()
  const authenticateUserCase = new AuthenticateUserCase(userRepository)

  return authenticateUserCase
}
