import { UserRepository } from '@/repositories/interface-user-repository'
import { User } from '@prisma/client'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  user: User
}

export class AuthenticateUserCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return {
      user,
    }
  }
}
