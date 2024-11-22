import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-case/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const gymIdSchemaParams = z.object({
    id: z.string().uuid(),
  })
  const checkInSchemaQuery = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { id } = gymIdSchemaParams.parse(request.params)

  const { latitude, longitude } = checkInSchemaQuery.parse(request.query)

  const checkInUseCase = makeCheckInUseCase()

  const checkIn = checkInUseCase.execute({
    userId: request.user.sub,
    gymId: id,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ checkIn })
}
