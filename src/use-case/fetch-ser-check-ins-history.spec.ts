import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchUserCaseCheckInsHistory } from './fetch-user-check-ins-history'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: FetchUserCaseCheckInsHistory

describe('Test Feth use case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCaseCheckInsHistory(inMemoryCheckInRepository)
  })

  it('should be able fetch check-ins history', async () => {
    const userId = 'user-id-01'
    await inMemoryCheckInRepository.create({
      gym_id: 'gym-id-1',
      user_id: userId,
    })

    await inMemoryCheckInRepository.create({
      gym_id: 'gym-id-2',
      user_id: userId,
    })

    const { checkIns } = await sut.execute({ userId })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it('should be able to fetch paginated check-in history')
})
