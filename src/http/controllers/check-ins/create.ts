import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-case/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const gymIdSchemaParams = z.object({
    gymId: z.string().uuid(),
  })
  const checkInSchemaBody = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = gymIdSchemaParams.parse(request.params)

  const { latitude, longitude } = checkInSchemaBody.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  const checkIn = await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ checkIn })
}
