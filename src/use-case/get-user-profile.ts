import { UserRepository } from '@/repositories/interface-user-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}
interface GetUserProfileResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
