import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRegister(app: FastifyInstance) {
  app.post('/users', register)
}
