import { CheckInRepository } from '@/repositories/interface-check-in-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

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

    const validationLimitAfterCheck = dayjs(new Date()).diff(
      validateCheckIn.created_at,
      'minutes',
    )
    console.log(validationLimitAfterCheck)

    if (validationLimitAfterCheck > 20) {
      throw new LateCheckInValidationError()
    }

    validateCheckIn.validated_at = new Date()

    const checkIn = await this.checkInRepository.save(validateCheckIn)

    return { checkIn }
  }
}
