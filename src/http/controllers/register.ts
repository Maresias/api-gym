import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUserCase} from '@/use-case/register'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try{
    const userRepository = new PrismaUserRepository()
    const registerUserCase = new  RegisterUserCase(userRepository)

    await registerUserCase.execute({
        name,
        email,
        password
    })
  }catch (err){
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
