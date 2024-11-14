import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Test Validate Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInRepository)
  })

  it('should be able  possible to validate check in', async () => {
    const createCheckIn = await inMemoryCheckInRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-1',
    })

    const { checkIn } = await sut.execute({ checkInId: createCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be possible to validate check in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'Invalid Check ID' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
