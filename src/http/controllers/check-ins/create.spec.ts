import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'
import { prisma } from '@/lib/prisma'

describe('Test ( e2e ) Check-Ins', async () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able create check-in', async () => {
    const userAuth = await createUserAuthenticate(app)

    const userLatitude = -23.779882
    const userLongitude = -45.563249

    const { token } = userAuth

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScrit',
        description: 'Treino pesado',
        phone: '00000-00000',
        latitude: -23.779882,
        longitude: -45.563249,
      },
    })

    const checkIn = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: userLatitude,
        longitude: userLongitude,
      })

    expect(checkIn.statusCode).toEqual(200)
  })
})
