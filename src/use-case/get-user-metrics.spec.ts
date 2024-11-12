import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Test user metrics use case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInRepository)
  })

  it('should be possible to get all the users checki-ns', async () => {
    const userId = 'user-id-1'

    await inMemoryCheckInRepository.create({
      user_id: userId,
      gym_id: 'gym-id-1',
    })
    await inMemoryCheckInRepository.create({
      user_id: userId,
      gym_id: 'gym-id-2',
    })

    const { checkInMetrics } = await sut.getCheckInMetrics({
      userId,
    })

    expect(checkInMetrics).toEqual(2)
  })
})
