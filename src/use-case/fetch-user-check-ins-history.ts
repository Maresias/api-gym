import { CheckInRepository } from '@/repositories/interface-check-in-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCaseCheckRequest {
  userId: string
}
interface FetchUserCaseCheckResponse {
  checkIns: CheckIn[]
}
export class FetchUserCaseCheckInsHistory {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: FetchUserCaseCheckRequest): Promise<FetchUserCaseCheckResponse> {
    const checkIns =
      await this.checkInRepository.findManyUserIdCheckInHistory(userId)

    return { checkIns }
  }
}
