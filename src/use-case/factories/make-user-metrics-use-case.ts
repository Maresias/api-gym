import { PrismaCheckInsRepository } from '@/repositories/pisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

  return useCase
}
