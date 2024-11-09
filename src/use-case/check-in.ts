import { CheckInRepository } from '@/repositories/interface-check-in-repository'
import { CheckIn } from '@prisma/client'
interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInuseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async create({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInuseCaseResponse> {
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
