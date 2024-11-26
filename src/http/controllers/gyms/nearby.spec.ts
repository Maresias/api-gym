import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'
describe('Test ( e2e ) Nearby gym', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able to fetch nearby gym  < (100m)', async () => {
    const authUser = await createUserAuthenticate(app)

    const userLatitude = -23.779882
    const userLongitude = -45.563249

    const { token } = authUser

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym 01',
        description: 'Treino pesado',
        phone: '0000-00000',
        latitude: -23.786952,
        longitude: -45.556697,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym 02',
        description: 'Treino pesado',
        phone: '0000-00000',
        latitude: -23.792323,
        longitude: -45.399554,
      })

    const responseNearby = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: userLatitude,
        longitude: userLongitude,
      })

    expect(responseNearby.statusCode).toEqual(200)
  })
})
