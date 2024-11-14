import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Test Validate Check In Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0))

    const createCheckIn = await inMemoryCheckInRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-1',
    })

    const twentyoneMinutesAfterCheckIn = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyoneMinutesAfterCheckIn)

    await expect(() =>
      sut.execute({ checkInId: createCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
