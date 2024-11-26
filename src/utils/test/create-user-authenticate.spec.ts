import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserAuthenticate(app: FastifyInstance) {
  const email = 'jhondoe@email.com'
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email,
    password: '1234567',
  })

  const authenticateResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'jhondoe@email.com',
      password: '1234567',
    })

  const user = await prisma.user.findFirstOrThrow()

  const { token } = authenticateResponse.body

  return { token, email, userId: user.id }
}
