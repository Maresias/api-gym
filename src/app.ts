import { fastify } from 'fastify'
import { appRegister } from './http/routes'

export const app = fastify()
app.register(appRegister)
