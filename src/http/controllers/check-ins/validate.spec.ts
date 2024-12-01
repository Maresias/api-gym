import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'
import { prisma } from '@/lib/prisma'

describe('Test ( e2e ) validate', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able to validate check-in', async () => {
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

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: userId,
      },
    })

    const responseValidate = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(responseValidate.statusCode).toEqual(204)
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
