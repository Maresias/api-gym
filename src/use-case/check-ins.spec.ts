import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { it, describe, beforeEach, expect } from 'vitest'
import { CheckInUseCase } from './check-in'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Test check in ', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(inMemoryCheckInRepository)
  })
  it('should be possible for the user to check in', async () => {
    const { checkIn } = await sut.create({
      userId: 'user-id-01',
      gymId: 'gym-id-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
