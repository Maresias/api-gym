import { PrismaCheckInsRepository } from '@/repositories/pisma/prisma-check-ins-repository'
import { FetchUserCaseCheckInsHistory } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCaseCheckInsHistory(prismaCheckInsRepository)

  return useCase
}
