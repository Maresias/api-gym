import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'

describe('Test ( e2e ) Check-Ins History', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able possible get history check-ins', async () => {
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

    const responseCheckInsHistory = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseCheckInsHistory.statusCode).toEqual(200)
    expect(responseCheckInsHistory.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
    ])
  })
})
