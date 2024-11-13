import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Test fetch Nearby gyms use case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymRepository)
  })

  it('should be able to fetch nearby gym', async () => {
    await inMemoryGymRepository.create({
      id: 'gym-id-01',
      title: 'Near Gym 01',
      description: 'trenio',
      phone: '',
      latitude: -23.785857,
      longitude: -45.556564,
    })

    await inMemoryGymRepository.create({
      id: 'gym-id-02',
      title: 'Far Gym 02 ',
      description: 'trenio',
      phone: '',
      latitude: -23.79937,
      longitude: -45.40403,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.779827,
      userLongitude: -45.563246,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym 01' })])
  })

  it('should be able to fetch nearby gym', async () => {
    await inMemoryGymRepository.create({
      id: 'gym-id-01',
      title: 'Near Gym 01',
      description: 'trenio',
      phone: '',
      latitude: -23.785857,
      longitude: -45.556564,
    })

    await inMemoryGymRepository.create({
      id: 'gym-id-02',
      title: 'Far Gym 02 ',
      description: 'trenio',
      phone: '',
      latitude: -23.79937,
      longitude: -45.40403,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.7996859,
      userLongitude: -45.4067357,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Far Gym 02 ' })])
  })
})
