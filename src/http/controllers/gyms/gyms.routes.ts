import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function appGymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
