import { PrismaUserRepository } from '@/repositories/pisma/prisma-user-repository'
import { AuthenticateUserCase } from '@/use-case/authenticate'
import { InvalidCredentialError } from '@/use-case/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchemaBody = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchemaBody.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const authenticateUserCase = new AuthenticateUserCase(usersRepository)

    await authenticateUserCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(200).send()
}
