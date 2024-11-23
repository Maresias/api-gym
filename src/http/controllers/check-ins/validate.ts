import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-case/factories/make-validate-check-ins-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateSchemaParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateSchemaParams.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
