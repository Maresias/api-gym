import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsUseCase } from '@/use-case/factories/make-fetch-user-check-ins-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbySchemaQuery = z.object({
    page: z.number().min(1),
  })

  const { page } = nearbySchemaQuery.parse(request.query)

  const nearbyCheckInUseCase = makeFetchUserCheckInsUseCase()

  const chenkIns = nearbyCheckInUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ chenkIns })
}
