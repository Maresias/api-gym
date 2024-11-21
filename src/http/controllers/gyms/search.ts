import { makeSearchGymsUseCase } from '@/use-case/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSchemaQuery = z.object({
    query: z.string(),
    page: z.coerce.number(),
  })

  const { query, page } = searchSchemaQuery.parse(request.query)

  const searchGym = makeSearchGymsUseCase()

  const { gyms } = await searchGym.execute({
    search: query,
    page,
  })

  return reply.status(200).send({ gyms })
}
