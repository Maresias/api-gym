import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'
import { prisma } from '@/lib/prisma'

describe('Test ( e2e ) metrics', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able possible get metrics', async () => {
    const userAuth = await createUserAuthenticate(app)

    const { token, userId } = userAuth

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript',
        description: 'Treino pesado',
        phone: '0000-0000',
        latitude: -23.779882,
        longitude: -45.563249,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: userId },
        { gym_id: gym.id, user_id: userId },
      ],
    })

    const responseMetrics = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseMetrics.statusCode).toEqual(200)
    expect(responseMetrics.body.checkInMetrics).toEqual(2)
  })
})
