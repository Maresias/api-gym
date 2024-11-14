import { CheckInRepository } from '@/repositories/interface-check-in-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInRequest {
  checkInId: string
}
interface ValidateCheckInResponse {
  checkIn: CheckIn
}
export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const validateCheckIn = await this.checkInRepository.findById(checkInId)

    if (!validateCheckIn) {
      throw new ResourceNotFoundError()
    }

    validateCheckIn.validated_at = new Date()

    const checkIn = await this.checkInRepository.save(validateCheckIn)

    return { checkIn }
  }
}
