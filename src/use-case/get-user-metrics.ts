import { CheckInRepository } from '@/repositories/interface-check-in-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInMetrics: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async getCheckInMetrics({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInMetrics =
      await this.checkInRepository.getUserCheckInmetrics(userId)

    return { checkInMetrics }
  }
}
