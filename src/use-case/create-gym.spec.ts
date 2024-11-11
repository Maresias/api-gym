import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GymUseCase } from './create-gym'

let inMenmoryGymRepository: InMemoryGymRepository
let sut: GymUseCase

describe('Test gym use case', () => {
  beforeEach(() => {
    inMenmoryGymRepository = new InMemoryGymRepository()
    sut = new GymUseCase(inMenmoryGymRepository)
  })

  it('should be able possible create gym', async () => {
    const { gym } = await sut.execute({
      title: 'j@v@',
      description: 'nodejs',
      phone: null,
      latitude: -23.779769,
      longitude: -45.56326,
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gym.title).toEqual('j@v@')
  })
})
