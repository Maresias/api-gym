import { PrismaUserRepository } from '@/repositories/pisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const userCase = new GetUserProfileUseCase(prismaUserRepository)

  return userCase
}
