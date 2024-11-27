import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsUseCase } from '@/use-case/factories/make-fetch-user-check-ins-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historySchemaQuery = z.object({
    page: z.coerce.number().min(1),
  })

  const { page } = historySchemaQuery.parse(request.query)

  const historyCheckInUseCase = makeFetchUserCheckInsUseCase()

  const { checkIns } = await historyCheckInUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(204).send({ checkIns })
}
