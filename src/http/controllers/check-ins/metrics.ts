import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-case/factories/make-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUseCase = makeGetUserMetricsUseCase()

  const { checkInMetrics } = await metricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInMetrics })
}
