import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'

describe('Test ( e2e ) search gym', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able search gym', async () => {
    const authUser = await createUserAuthenticate(app)
    const { token } = authUser

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Treino pesado',
        phone: '0000-00000',
        latitude: -23.786952,
        longitude: -45.556697,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TaypeScript Gym',
        description: 'Treino pesado',
        phone: '0000-00000',
        latitude: -23.786952,
        longitude: -45.556697,
      })

    const responseSearch = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ query: 'JavaScript' })

    expect(responseSearch.statusCode).toEqual(200)
  })
})
