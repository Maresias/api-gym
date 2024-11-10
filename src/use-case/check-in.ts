import { CheckInRepository } from '@/repositories/interface-check-in-repository'
import { GymRepository } from '@/repositories/interface-gym-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInuseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async create({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInuseCaseResponse> {
    const gym = this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInSameDay) {
      throw new Error('invalida')
    }
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
