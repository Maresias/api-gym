import { UserRepository } from '@/repositories/interface-user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface ResgisterUserCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUseCaseRequest): Promise<ResgisterUserCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const password_hash = await hash(password, 6)
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
