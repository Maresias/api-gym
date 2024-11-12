import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Test search gyms use case', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(inMemoryGymRepository)
  })

  it('should be able search for gym', async () => {
    await inMemoryGymRepository.create({
      title: 'j@v@',
      description: 'nodejs',
      phone: null,
      latitude: -23.779769,
      longitude: -45.56326,
    })
    await inMemoryGymRepository.create({
      title: 'typescript',
      description: 'nodejs',
      phone: null,
      latitude: -23.779769,
      longitude: -45.56326,
    })

    const { gyms } = await sut.execute({
      search: 'j@v@',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'j@v@' })])
  })

  it('should be able search for many gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymRepository.create({
        title: `j@v@ - id-${i}`,
        description: 'nodejs',
        phone: null,
        latitude: -23.779769,
        longitude: -45.56326,
      })
    }

    const { gyms } = await sut.execute({
      search: 'j@v@',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'j@v@ - id-21' }),
      expect.objectContaining({ title: 'j@v@ - id-22' }),
    ])
  })
})
