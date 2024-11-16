import { PrismaCheckInsRepository } from '@/repositories/pisma/prisma-check-ins-repository'
import { PrismaGymRepository } from '@/repositories/pisma/prisma-gym-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymRepository,
  )

  return useCase
}
