import { GymRepository } from '@/repositories/interface-gym-repository'
import { Gym } from '@prisma/client'

interface GymUseCaseRequest {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseResponse {
  gym: Gym
}

export class GymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCaseRequest): Promise<GymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      id,
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
