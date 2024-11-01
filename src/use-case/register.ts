import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserCase{
    constructor(private usersRegister: any) {}

    async execute({name, email, password,}: registerUseCaseRequest){

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
              email,
            },
        })

        if (userWithSameEmail) {
            throw new Error('E-mail already exists')
        }
        const password_hash = await hash(password, 6)
        await this.usersRegister.create({
            name,
            email,
            password_hash,
        })
    }
}
