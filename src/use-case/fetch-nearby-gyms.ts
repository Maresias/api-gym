import { GymRepository } from '@/repositories/interface-gym-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymRequest {
  userLatitude: number
  userLongitude: number
}

interface FertchNearbyGymResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymRequest): Promise<FertchNearbyGymResponse> {
    const gyms = await this.gymRepository.findManyNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
