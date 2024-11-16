import { PrismaGymRepository } from '@/repositories/pisma/prisma-gym-repository'
import { GymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const prismaGymREpository = new PrismaGymRepository()
  const useCase = new GymUseCase(prismaGymREpository)

  return useCase
}
