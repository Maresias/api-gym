import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUserCase } from '@/use-case/register'
import { PrismaUserRepository } from '@/repositories/pisma/prisma-user-repository'
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const registerUserCase = new RegisterUserCase(userRepository)

    await registerUserCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError){
      return reply.status(409).send({
        message: err.message
      })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
