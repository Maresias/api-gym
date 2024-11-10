import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { it, describe, beforeEach, expect, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Test check in ', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository()
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymRepository)

    inMemoryGymRepository.gyms.push({
      id: 'gym-id-01',
      title: 'gym',
      description: 'trenio',
      phone: '',
      latitude: new Decimal(-23.780252),
      longitude: new Decimal(-45.56327),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be possible for the user to check in', async () => {
    vi.setSystemTime(new Date(2008, 6, 1, 12))
    const { checkIn } = await sut.create({
      userId: 'user-id-01',
      gymId: 'gym-id-01',
      userLatitude: -23.779769,
      userLongitude: -45.56326,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2008, 6, 7, 12))

    const userId = 'user-id-01'
    const gymId = 'gym-id-01'

    await sut.create({
      userId,
      gymId,
      userLatitude: -23.779769,
      userLongitude: -45.56326,
    })

    await expect(() =>
      sut.create({
        userId,
        gymId,
        userLatitude: -23.779769,
        userLongitude: -45.56326,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2008, 6, 1, 12))
    const userId = 'user-id-01'
    const gymId = 'gym-id-01'

    await sut.create({
      userId,
      gymId,
      userLatitude: -23.779769,
      userLongitude: -45.56326,
    })

    vi.setSystemTime(new Date(2009, 6, 1, 12))

    const check = await sut.create({
      userId,
      gymId,
      userLatitude: -23.779769,
      userLongitude: -45.56326,
    })

    expect(check.checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to chechi in on distant gym', async () => {
    inMemoryGymRepository.gyms.push({
      id: 'gym-id-02',
      title: 'gym-super',
      description: 'treino',
      phone: '',
      latitude: new Decimal(-23.785831),
      longitude: new Decimal(-45.588218),
    })

    await expect(() =>
      sut.create({
        userId: 'user-id-01',
        gymId: 'gym-id-02',
        userLatitude: -23.779769,
        userLongitude: -45.56326,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
