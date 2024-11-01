import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCaseRequest({
  name,
  email,
  password,
}: registerUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const password_hash = await hash(password, 6)

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
