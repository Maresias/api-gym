import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'

describe('Test ( e2e ) gyms', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })
  it('should be able possible create gym', async () => {
    const userAuth = await createUserAuthenticate(app)

    const { token } = userAuth
    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript',
        description: 'Treino pesado',
        phone: '0000-00000',
        latitude: -23.786952,
        longitude: -45.556697,
      })

    expect(gym.statusCode).toEqual(201)
  })
})
