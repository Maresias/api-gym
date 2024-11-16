import { PrismaGymRepository } from '@/repositories/pisma/prisma-gym-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymREpository = new PrismaGymRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymREpository)

  return useCase
}
