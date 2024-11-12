import { GymRepository } from '@/repositories/interface-gym-repository'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  search: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    search,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyGyms(search, page)

    return { gyms }
  }
}
